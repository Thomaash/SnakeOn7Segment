function updateCountDown() {
    if ( game.vars.state === "run" && ++game.vars.update >= 60 ) {
        var color,
            col     = Math.floor( game.vars.segments.length * 3 / 4 ),
            row     = Math.floor( game.vars.segments[ col ].length * 3 / 4 ),
            segment = game.vars.segments[ col ][ row ];

        if ( game.vars.countDown > 0 ) {
            game.vars.update = 0;

            switch ( game.vars.countDown ) {
                case 1:
                    color = LED.prototype.state.red;
                    break;
                case 2:
                    color = LED.prototype.state.yellow;
                    break;
                case 3:
                    color = LED.prototype.state.green;
                    break;
                default:
                    color = LED.prototype.state.darkGreen;
            }

            segment.setState( SevenSegment.prototype.states[ game.vars.countDown-- ], color );
        } else {
            segment.setState( SevenSegment.prototype.states.off );
            start();
        }
    }
}