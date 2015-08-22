function cleanMap( destroy ) {
    for ( var row = 0; row < game.vars.segments.length; ++row ) {
        for ( var col = 0; col < game.vars.segments[ row ].length; ++col ) {
            if ( destroy ) {
                game.vars.segments[ row ][ col ].destroy();
            } else {
                game.vars.segments[ row ][ col ].setState( SevenSegment.prototype.states.off );
            }
        }
    }

    game.vars.map.clearBlocking();
}