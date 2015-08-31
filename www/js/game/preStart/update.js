define( [], function () {
    return function () {
        if ( ++game.vars.update >= 60 ) {
            var color,
                segment = game.vars.segments[ 0 ][ 0 ];

            if ( game.vars.countDown > 0 ) {
                game.vars.update = 0;

                switch ( game.vars.countDown ) {
                    case 1:
                        color = LED.prototype.state.green;
                        break;
                    case 2:
                        color = LED.prototype.state.yellow;
                        break;
                    case 3:
                        color = LED.prototype.state.red;
                        break;
                    default:
                        color = LED.prototype.state.darkGreen;
                }

                segment.setState( SevenSegment.prototype.states[ game.vars.countDown-- ], color );
            } else {
                segment.setState( SevenSegment.prototype.states.off );
                game.state.start( "Game" );
            }
        }
    };
} );