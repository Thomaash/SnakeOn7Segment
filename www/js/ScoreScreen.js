function ScoreScreen() {
    var score = game.vars.snakeLength + 1,
        leds  = game.vars.segments.length * game.vars.segments[ 0 ].length * 7;
    this.scoreText = score + "";
    this.offsetRow = Math.ceil( game.vars.segments[ 0 ].length / 2 ); // Middle right
    this.offsetCol = Math.ceil( (game.vars.segments.length - this.scoreText.length) / 2 ); // Middle bottom

    // Set appropriate color, green for best (filling half+ of map), red for worst (< 1/4)
    // Increase/decrease level
    if ( score >= leds / 2 ) {
        this.color = LED.prototype.state.green;
        game.vars.level.add( 1, 0 ); // 1 time to proceed to next level
    } else if ( score >= leds / 3 ) {
        this.color = LED.prototype.state.darkGreen;
        game.vars.level.add( 0, 5 ); // 2 times to proceed to next level
    } else if ( score >= leds / 4 ) {
        this.color = LED.prototype.state.yellow;
        game.vars.level.add( 0, 1 ); // 10 times to proceed to next level
    } else {
        this.color = LED.prototype.state.red;
        game.vars.level.sub( 1, 0 ); // Lose 1 level
    }
}
ScoreScreen.prototype.update = function () {
    if ( ++game.vars.update === 120 ) {
        // Show help
        game.vars.ui.elements.centerScreenText.text = "Tap anywhere to continue";
        game.vars.ui.elements.centerScreenText.visible = true;

        // Turn off all LEDs
        cleanMap( false );

        // Light up score digits
        for ( var col = 0; col < game.vars.segments.length && col < this.scoreText.length; ++col ) {
            game.vars.segments[ col + this.offsetCol ][ this.offsetRow ]
                .setState( SevenSegment.prototype.states[ this.scoreText[ col ] ], this.color );
        }
    }
};