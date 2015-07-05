function create() {
    // Scaling
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; // Scale the game to fit the screen (keep ratio)
    game.scale.pageAlignVertically = true; // Align vertically, horizontal alignment is solved in css

    // Background
    game.stage.backgroundColor = '#000';

    // By default Phaser only starts 2 pointers, enable 6 pointers
    game.input.addPointer();
    game.input.addPointer();
    game.input.addPointer();
    game.input.addPointer();

    // Create segments
    for ( var col = 0; col < game.vars.cols; ++col ) {
        game.vars.segments[ col ] = [];
        for ( var row = 0; row < game.vars.rows; ++row ) {
            game.vars.segments[ col ][ row ] = new SevenSegment( col, row );
        }
    }

    // Create map
    game.vars.map = new Map();

    // Controls
    createEventListeners();
}