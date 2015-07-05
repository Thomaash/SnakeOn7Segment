function updateCountDown() {
    if ( game.vars.state === "run" && ++game.vars.update >= 60 ) {
        var col     = Math.floor( game.vars.segments.length * 3 / 4 ),
            row     = Math.floor( game.vars.segments[ col ].length * 3 / 4 ),
            segment = game.vars.segments[ col ][ row ];
        if ( game.vars.countDown > 0 ) {
            game.vars.update = 0;
            segment.setState( SevenSegment.prototype.states[ game.vars.countDown-- ] );
        } else {
            segment.setState( SevenSegment.prototype.states.off );
            start();
        }
    }
}