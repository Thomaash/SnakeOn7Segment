define( [], function () {
    function Snake( map ) {
        var led = map.map[ 0 ][ 0 ].rb;
        led.setState( led.states.snakeHead );

        this.leds = [ led ];
        this.direction = { previous: "r", next: "r" };
    }

    Snake.prototype = {
        die   : function () {
            var led = this.leds[ this.leds.length - 1 ];
            led.setState( led.states.dead );
        },
        length: function () {
            return this.leds.length;
        },
        turn  : function ( direction ) {
            this.direction.next = direction;
        },
        move  : function () {
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
                || ledNext.getState() === ledNext.states.snake
                || point.isBlocked( idLast, idNext )
            ) {
                return false;
            }

            // Check for food
            if ( ledNext.getState() === ledNext.states.food ) {
                game.vars.food = null;
                removeLast = false;
            }

            // Add new LED to snake
            this.leds.push( ledNext );
            ledNext.setState( ledNext.states.snakeHead );
            point.block( idLast, idNext );

            // Set former head LED to snake body
            ledLast.setState( ledNext.states.snake );

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
                remove.setState( remove.states.empty );
            }

            return true;
        }
    };

    return Snake;
} );