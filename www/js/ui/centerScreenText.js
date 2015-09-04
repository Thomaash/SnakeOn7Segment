define( [], function () {
    return function ( text, group ) {
        var centerScreenText = new Phaser.Text(
            game,
            game.world.centerX, game.world.height / 3,
            text,
            { font: game.vars.font.menu(), fill: game.vars.font.fill, align: "center" }
        );
        centerScreenText.anchor.set( 0.5, 0.5 );
        centerScreenText.wordWrap = true;
        centerScreenText.wordWrapWidth = game.world.width - 50;

        group.add( centerScreenText );

        return centerScreenText;
    };
} );