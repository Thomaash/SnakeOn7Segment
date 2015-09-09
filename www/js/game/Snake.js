define( [], function () {
    function Snake( firstLED, canEat, headColor ) {
        this.leds = [ firstLED ];
        this.canEat = typeof canEat === "boolean" ? canEat : true;
        this.direction = { previous: "r", next: "r" };
        this.ledsToChange = { empty: null };
        this.colors = {
            head : typeof headColor === "string" ? headColor : firstLED.states.snake0Head,
            body : firstLED.states.snake0Body,
            empty: firstLED.states.empty
        };

        firstLED.setState( this.colors.head );
    }

    Snake.prototype = {
        die       : function () {
            var led = this.leds[ this.leds.length - 1 ];
            led.setState( led.states.dead );

            // Prevent movement
            this.move = function () { return true; };
            this.changeLeds = function () { };
        },
        length    : function () {
            return this.leds.length;
        },
        turn      : function ( direction ) {
            this.direction.next = this.turns[ direction ][ this.direction.previous ];
        },
        nextDir   : function ( direction ) {
            if ( this.turns.forbidden[ this.direction.previous ] != direction ) {
                this.direction.next = direction;
            }
        },
        move      : function () {
            var edge, sideRegex,
                ledLast    = this.leds[ this.leds.length - 1 ],
                removeLast = true;

            switch ( this.direction.previous ) {
                case "t":
                case "l":
                    edge = "TL";
                    break;
                case "b":
                case "r":
                    edge = "BR";
                    break;
            }
            switch ( this.direction.next ) {
                case "t":
                case "b":
                    sideRegex = /[tb]/g;
                    break;
                case "l":
                case "r":
                    sideRegex = /[rl]/g;
                    break;
            }

            var idLast  = ledLast[ edge ].pos,
                idNext  = this.direction.next + ledLast[ edge ].pos.replace( sideRegex, "" ),
                point   = ledLast[ edge ].point,
                ledNext = point[ idNext ];
            this.direction.previous = this.direction.next;

            // Check for collisions
            if (
                ledNext == null
                || (ledNext.getState() !== ledNext.states.empty && ledNext.getState() !== ledNext.states.food)
                || point.isBlocked( idLast, idNext )
            ) {
                return false;
            }

            // Check for food
            if ( ledNext.getState() === ledNext.states.food ) {
                game.vars.food = null;
                if ( this.canEat ) {
                    removeLast = false;
                }
            }

            // Add new LED to snake
            this.leds.push( ledNext );
            ledNext.setState( this.colors.head );
            point.block( idLast, idNext );

            // Set former head LED to snake body
            ledLast.setState( this.colors.body );

            if ( removeLast ) {
                var remove = this.leds[ 0 ],
                    last   = this.leds[ 1 ];

                // Unblock point if blocked
                if ( remove.TL.point === last.TL.point || remove.TL.point === last.BR.point ) {
                    remove.TL.point.unblock( remove );
                } else if ( remove.BR.point === last.TL.point || remove.BR.point === last.BR.point ) {
                    remove.BR.point.unblock( remove );
                }

                // Remove last LED from snake
                for ( var i = 1; i < this.leds.length; ++i ) {
                    this.leds[ i - 1 ] = this.leds[ i ];
                }
                this.leds.length--;

                // Set removed LED to empty
                this.ledsToChange.empty = remove;
            }

            return true;
        },
        changeLeds: function () {
            // Release tail LED after every snake moved
            this.changeLed( this.ledsToChange.empty, this.colors.empty );
        },
        changeLed : function ( led, color ) {
            if ( led != null ) {
                led.setState( color );
            }
        },
        turns     : {
            left     : { t: "l", r: "t", b: "r", l: "b" },
            right    : { t: "r", r: "b", b: "l", l: "t" },
            forbidden: { t: "b", r: "l", b: "t", l: "r" }
        }
    };

    return Snake;
} );