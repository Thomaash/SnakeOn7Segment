define( [ "state/game", "tools/changeSize", "Phaser" ], function ( game, changeSize, Phaser ) {
    return function () {
        changeSize( game );
        game.vars.quality = 160;

        // Preload LED assets
        game.load.atlas(
            "LEDs",
            "assets/" + game.vars.quality + ".png",
            "assets/" + game.vars.quality + ".json",
            Phaser.Loader.TEXTURE_ATLAS_JSON_HASH
        );

        // Preload arrows
        game.load.spritesheet( "Arrows", "assets/Arrows.png", 90, 90 );
    };
} );