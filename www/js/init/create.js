define( [ "state/game" ], function ( game ) {
    return function () {
        // Scaling
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; // Scale the game to fit the screen (keep ratio)
        game.scale.pageAlignVertically = true; // Align vertically, horizontal alignment is solved in css

        // Background
        game.stage.backgroundColor = "#000";

        // By default Phaser only starts 2 pointers, enable 6 pointers
        game.input.addPointer();
        game.input.addPointer();
        game.input.addPointer();
        game.input.addPointer();

        // Enter main menu
        game.state.start( "MenuMain" );
    };
} );