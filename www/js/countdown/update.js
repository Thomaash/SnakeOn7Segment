define( [ "state/game", "segment/Seven" ], function ( game, SevenSegment ) {
    return function () {
        if ( ++game.vars.update >= 60 ) {
            var color,
                segment = game.vars.segments;

            if ( game.vars.countDown > 0 ) {
                game.vars.update = 0;

                switch ( game.vars.countDown ) {
                    case 1:
                        color = SevenSegment.prototype.state.led.green;
                        break;
                    case 2:
                        color = SevenSegment.prototype.state.led.yellow;
                        break;
                    case 3:
                        color = SevenSegment.prototype.state.led.red;
                        break;
                    default:
                        color = SevenSegment.prototype.state.led.darkGreen;
                }

                segment.setState( SevenSegment.prototype.state.segment[ game.vars.countDown-- ], color );
            } else {
                segment.setState( SevenSegment.prototype.state.segment.off );
                game.state.start( "Game" );
            }
        }
    };
} );