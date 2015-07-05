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

    // Help UI arrows
    var x = game.world.width, y = (game.world.height - 90) / 2;
    game.vars.ui.elements.leftArrow = game.add.sprite( 45, y, "Arrows", 0 );
    game.vars.ui.elements.rightArrow = game.add.sprite( x - 90 - 45, y, "Arrows", 1 );

    // Help UI text
    game.vars.ui.elements.centerScreenText = game.add.text(
        game.world.centerX, game.world.height / 3,
        "Tap to start the game.",
        { font: game.vars.ui.font, fill: "#ddd", align: "center" }
    );
    game.vars.ui.elements.centerScreenText.anchor.set( 0.5, 0.5 );
    game.vars.ui.elements.centerScreenText.wordWrap = true;
    game.vars.ui.elements.centerScreenText.wordWrapWidth = game.world.width - 50;

    // Create map
    game.vars.map = new Map();

    // Controls
    createEventListeners();
}