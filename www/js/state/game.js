define( [ "state/vars", "Phaser" ], function ( vars, Phaser ) {
    var game = new Phaser.Game( 1200, 720, Phaser.AUTO );
    game.vars = vars;

    return game;
} );