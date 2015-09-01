define( [], function () {
    return function () {
        game.vars.quality = 160;
        game.vars.rows = 2;
        game.vars.cols = 6;

        // Preload LED assets
        game.load.atlas(
            "LEDs",
            "assets/" + game.vars.quality + ".png",
            "assets/" + game.vars.quality + ".json",
            Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY
        );

        // Preload arrows
        game.load.spritesheet( "Arrows", "assets/Arrows.png", 90, 90 );
    };
} );