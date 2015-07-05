function updateScore() {
    if ( ++game.vars.update === 120 ) {
        var color,
            score     = (game.vars.snakeLength + 1),
            scoreText = score + "",
            offsetRow = Math.ceil( game.vars.segments[ 0 ].length / 2 ), // Middle right
            offsetCol = Math.ceil( (game.vars.segments.length - scoreText.length) / 2 ), // Middle bottom
            leds      = game.vars.segments.length * game.vars.segments[ 0 ].length * 7;

        // Set appropriate color, green for best (filling half+ of map), red for worst (< 1/4)
        if ( score >= leds / 2 ) {
            color = LED.prototype.state.green;
        } else if ( score >= leds / 3 ) {
            color = LED.prototype.state.darkGreen;
        } else if ( score >= leds / 4 ) {
            color = LED.prototype.state.yellow;
        } else {
            color = LED.prototype.state.red;
        }

        cleanMap();

        for ( var col = 0; col < game.vars.segments.length && col < scoreText.length; ++col ) {
            game.vars.segments[ col + offsetCol ][ offsetRow ]
                .setState( SevenSegment.prototype.states[ scoreText[ col ] ], color );
        }
    }
}