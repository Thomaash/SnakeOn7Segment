define( [], function () {
    return function () {
        // Set map size
        // First level have 2 rows, 2nd 3, etc., level is decimal number
        game.vars.rows = game.vars.level.floor() + 1;
        game.vars.cols = 3 * game.vars.rows;

        // Count sprite quality
        game.vars.quality = quality( game.vars.cols, game.vars.rows );

        // Preload LED assets
        game.load.atlas(
            "LEDs",
            "assets/" + game.vars.quality + ".png",
            "assets/" + game.vars.quality + ".json",
            Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY
        );
    };
} );