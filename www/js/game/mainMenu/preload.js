define( [], function () {
    return function () {
        game.vars.state = "mainMenu";

        game.load.spritesheet( "button", "assets/buttons.png", 320, 64 );
        game.load.image( "header", "assets/header.png" );
    };
} );