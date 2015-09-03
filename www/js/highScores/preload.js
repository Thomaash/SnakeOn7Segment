define( [ "tools/changeSize" ], function ( changeSize ) {
    return function () {
        changeSize( game );

        game.load.spritesheet( "button", "assets/buttons.png", 320, 64 );
    };
} );