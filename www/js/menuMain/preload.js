define( [ "state/game", "tools/changeSize" ], function ( game, changeSize ) {
    return function () {
        changeSize( game );

        game.load.spritesheet( "button", "assets/buttons.png", 320, 64 );
        game.load.spritesheet( "buttonSquare", "assets/buttonSquare.png", 64, 64 );
        game.load.image( "header", "assets/header.png" );
    };
} );