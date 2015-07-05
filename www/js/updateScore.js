function updateScore() {
    if ( ++game.vars.update === 120 ) {
        var score     = (game.vars.snakeLength + 1),
            scoreText = score + "",
            offsetRow = Math.ceil( game.vars.segments[ 0 ].length / 2 ),
            offsetCol = Math.ceil( (game.vars.segments.length - scoreText.length) / 2 );

        cleanMap();

        for ( var col = 0; col < game.vars.segments.length && col < scoreText.length; ++col ) {
            game.vars.segments[ col + offsetCol ][ offsetRow ]
                .setState( SevenSegment.prototype.states[ scoreText[ col ] ] );
        }
    }
}