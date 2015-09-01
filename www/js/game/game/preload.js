define( [], function () {
    function quality( cols, rows ) {
        var size    = {
                width : window.innerWidth / cols / SevenSegment.prototype.width,
                height: window.innerHeight / rows / SevenSegment.prototype.height
            },
            quality = {
                high  : 0.875,
                medium: 0.625,
                low   : 0.375
            };

        if ( size.width > quality.high && size.height > quality.high ) {
            return 160;
        } else if ( size.width > quality.medium && size.height > quality.medium ) {
            return 120;
        } else if ( size.width > quality.low && size.height > quality.low ) {
            return 80;
        } else {
            return 40;
        }
    }

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