define( [ "state/game", "tools/changeSize" ], function ( game, changeSize ) {
    return function () {
        changeSize( game );
        game.vars.quality = game.vars.multiplayer ? 80 : 160; // Use half width LEDs for 2 scores

        // Preload LED assets
        game.load.atlas(
            "LEDs",
            "assets/" + game.vars.quality + ".png",
            "assets/" + game.vars.quality + ".json",
            Phaser.Loader.TEXTURE_ATLAS_JSON_HASH
        );
    };
} );