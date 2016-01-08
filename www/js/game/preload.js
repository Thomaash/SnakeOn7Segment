define( [ "state/game", "segment/Seven", "Phaser" ], function ( game, SevenSegment, Phaser ) {
    function quality( cols, rows ) {
        var size    = Math.min(
                window.innerWidth / cols / SevenSegment.prototype.width,
                window.innerHeight / rows / SevenSegment.prototype.height
            ),
            quality = { high: 0.875, medium: 0.625, low: 0.375 };

        if ( size > quality.high ) {
            return 160;
        } else if ( size > quality.medium ) {
            return 120;
        } else if ( size > quality.low ) {
            return 80;
        } else {
            return 40;
        }
    }

    return function () {
        switch ( game.vars.gameType ) {
            case  "classic":
                // Set map size
                // First level have 2 rows, 2nd 3, etc., level is decimal number
                game.vars.rows = game.vars.level.floor() + 1;
                game.vars.cols = 3 * game.vars.rows;

                // Set game speed, 1.5 LED/s for first, 3 LED/s for second, 4.5 LED/s for third…
                game.vars.speed = game.vars.level.floor() * 3;
                break;
            case "single":
                game.vars.cols = 3 * game.vars.rows;
                break;
        }

        // Count sprite quality
        game.vars.quality = quality( game.vars.cols, game.vars.rows );

        // Preload LED assets
        game.load.atlas(
            "LEDs",
            "assets/" + game.vars.quality + ".png",
            "assets/" + game.vars.quality + ".json",
            Phaser.Loader.TEXTURE_ATLAS_JSON_HASH
        );
    };
} );