define( [], function () {
    return function () {
        // Set map size
        // First level have 2 rows, 2nd 3, etc., level is decimal number
        game.vars.rows = game.vars.level.floor() + 1;
        game.vars.cols = 3 * game.vars.rows;

        // Count sprite quality
        game.vars.quality = quality( game.vars.cols, game.vars.rows );

        // Count IU scale
        game.vars.scale.ui = game.height / 720;

        // Set font size
        game.vars.ui.font.size = Math.round( game.height / 12 );

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