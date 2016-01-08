define( [ "state/game" ], function ( game ) {
    return function ( text, group, x, y, angle, wordWrapWidth ) {
        var textObject = new Phaser.Text(
            game,
            x == null ? game.world.centerX : x,
            y == null ? game.world.height / 3 : y,
            text,
            { font: game.vars.font.menu(), fill: game.vars.font.fill, align: "center" }
        );
        textObject.anchor.set( 0.5, 0.5 );
        textObject.angle = angle == null ? 0 : angle;
        textObject.wordWrap = true;
        textObject.wordWrapWidth = wordWrapWidth == null ? game.world.width - 50 : wordWrapWidth;

        group.add( textObject );

        return textObject;
    };
} );