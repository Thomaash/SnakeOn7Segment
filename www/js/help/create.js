define( [ "state/game", "ui/button" ], function ( game, button ) {
    function helpText( text ) {
        var textObject = game.add.text(
            40, game.world.height / 2, text,
            { font: game.vars.font.menu(), fill: game.vars.font.fill, align: "left" }
        );
        textObject.anchor.set( 0, 0.5 );
        textObject.wordWrap = true;
        textObject.wordWrapWidth = game.world.width - textObject.getBounds().x * 2;

        return textObject;
    }

    function footer( text ) {
        var textObject = game.add.text(
            game.world.width, game.world.height, text,
            { font: game.vars.font.footer(), fill: game.vars.font.fill, align: "right" }
        );
        textObject.anchor.set( 1, 1 );

        return textObject;
    }

    var click = {
        menu: function () {
            game.state.start( game.state.states[ "Help" ].back );
        }
    };

    return function () {
        // Close button
        button( 200, 40, "Close", click.menu, "button" );

        // Help text
        helpText( this.game.state.states[ "Help" ].text );

        // Footer
        footer( "Hint: Help buttons (question mark rhombuses) can be hidden in settings." );
    };
} );
