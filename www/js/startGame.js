function startGame() {
    // Prevent function from being called two times
    game.vars.functions.update = function () {};

    // Destroy old screen
    if ( game.vars.map != null ) {
        // Destroy UI
        game.vars.ui.elements.centerScreenText.destroy();
        game.vars.ui.elements.leftArrow.destroy();
        game.vars.ui.elements.rightArrow.destroy();

        // Destroy segments
        cleanMap( true );
    }

    // Set map size
    game.vars.rows = Math.round( Math.random() * 3 + 2 );
    game.vars.cols = 3 * game.vars.rows;

    // Count sprite quality
    game.vars.quality = quality( game.vars.cols, game.vars.rows );

    // Count LED scale
    game.vars.scale.leds = game.vars.quality / 160;

    // Count and set canvas dimensions
    var width  = game.vars.cols
            * (SevenSegment.prototype.width + SevenSegment.prototype.margin)
            * game.vars.scale.leds,
        height = game.vars.rows
            * (SevenSegment.prototype.height + SevenSegment.prototype.margin)
            * game.vars.scale.leds;
    game.width = width;
    game.height = height;
    game.world.width = width;
    game.world.height = height;
    game.renderer.resize( width, height ); // Tell renderer to resize canvas
    game.scale.refresh(); // Tell scale manager to scale to new canvas size

    // Count IU scale
    game.vars.scale.ui = game.height / 720;

    // Set font size
    game.vars.ui.font.size = Math.round( game.height / 12 );

    // Preload assets
    game.load.atlas(
        "LEDs",
        "assets/" + game.vars.quality + ".png",
        "assets/" + game.vars.quality + ".json",
        Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY
    );

    // Help UI arrows
    var x = game.world.width, y = game.world.height / 2;
    game.vars.ui.elements.leftArrow = game.vars.groups.ui.create( x * 0.1, y, "Arrows", 0 );
    game.vars.ui.elements.rightArrow = game.vars.groups.ui.create( x * 0.9, y, "Arrows", 1 );
    game.vars.ui.elements.leftArrow.scale.x = game.vars.scale.ui;
    game.vars.ui.elements.leftArrow.scale.y = game.vars.scale.ui;
    game.vars.ui.elements.rightArrow.scale.x = game.vars.scale.ui;
    game.vars.ui.elements.rightArrow.scale.y = game.vars.scale.ui;
    game.vars.ui.elements.leftArrow.anchor.setTo( 0.5, 0.5 );
    game.vars.ui.elements.rightArrow.anchor.setTo( 0.5, 0.5 );

    // Help UI text
    game.vars.ui.elements.centerScreenText = new Phaser.Text(
        game,
        game.world.centerX, game.world.height / 3,
        "Tap to start the game.",
        { font: game.vars.ui.font.get(), fill: "#ddd", align: "center" }
    );
    game.vars.groups.ui.add( game.vars.ui.elements.centerScreenText );
    game.vars.ui.elements.centerScreenText.anchor.set( 0.5, 0.5 );
    game.vars.ui.elements.centerScreenText.wordWrap = true;
    game.vars.ui.elements.centerScreenText.wordWrapWidth = game.world.width - 50;

    // Start loading and game when finished
    game.load.start();
}