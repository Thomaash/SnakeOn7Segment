function updateCountDown() {
    if ( game.vars.state === "run" && ++game.vars.update >= 60 ) {
        var segment = game.vars.segments[ game.vars.segments.length - 2 ][ 1 ];
        if ( game.vars.countDown > 0 ) {
            game.vars.update = 0;
            segment.setState( SevenSegment.prototype.states[ game.vars.countDown-- ] );
        } else {
            segment.setState( SevenSegment.prototype.states.off );
            start();
        }
    }
}