define( [], function () {
    function Snake( firstLED, canEat, immortal, headColor, bodyColor ) {
        this.leds = [ firstLED ];
        this.canEat = typeof canEat === "boolean" ? canEat : true;
        this.direction = { previous: "r", next: "r" };
        this.ledsToChange = { empty: null };

        // Set default colors
        this.states = firstLED.states;
        this.colors = { empty: firstLED.states.empty };
        this.setDefaultColor( "head", headColor );
        this.setDefaultColor( "body", bodyColor );

        if ( immortal ) { this.die = function () {}; }

        // Set first LEDs color
        firstLED.setState( this.colors.head );
    }

    Snake.prototype = {
        die            : function () {
            this.index = this.leds.length;

            // Prevent movement and change color
            this.move = function () {
                var led = this.leds[ --this.index ];
                if ( led != null ) {
                    led.setState( led.states.dead );
                } else {
                    this.move = function () { };
                    return true;
                }
            };
            this.changeLeds = function () { };
        },
        length         : function () {
            return this.leds.length;
        },
        turn           : function ( direction ) {
            this.direction.next = this.turns[ direction ][ this.direction.previous ];
        },
        nextDir        : function ( direction ) {
            if ( this.turns.forbidden[ this.direction.previous ] != direction ) {
                this.direction.next = direction;
            }
        },
        move           : function () {
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
                this.die();
                return;
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
        },
        changeLeds     : function () {
            // Release tail LED after every snake moved
            this.changeLed( this.ledsToChange.empty, this.colors.empty );
        },
        changeLed      : function ( led, color ) {
            if ( led != null ) {
                led.setState( color );
            }
        },
        setDefaultColor: function ( id, color ) {
            var stateSuffix = id.charAt( 0 ).toUpperCase() + id.slice( 1 );
            switch ( typeof color ) {
                case "string":
                    this.colors[ id ] = color;
                    break;
                case "number":
                    this.colors[ id ] = this.states[ "snake" + color + stateSuffix ];
                    break;
                default:
                    this.colors[ id ] = this.states[ "snake0" + stateSuffix ];
                    break;
            }
        },
        turns          : {
            left     : { t: "l", r: "t", b: "r", l: "b" },
            right    : { t: "r", r: "b", b: "l", l: "t" },
            forbidden: { t: "b", r: "l", b: "t", l: "r" }
        }
    };

    return Snake;
} );