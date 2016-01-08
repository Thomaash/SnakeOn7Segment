define( [ "state/vars" ], function ( vars ) {
    var game = new Phaser.Game( 1200, 720, Phaser.AUTO );
    game.vars = vars;

    return game;
} );