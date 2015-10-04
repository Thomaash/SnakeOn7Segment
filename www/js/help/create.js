define( [ "ui/button" ], function ( button ) {
    function text( text ) {
        var textObject = game.add.text(
            40, game.world.height / 2, text,
            { font: game.vars.font.menu(), fill: game.vars.font.fill, align: "left" }
        );
        textObject.anchor.set( 0, 0.5 );
        textObject.wordWrap = true;
        textObject.wordWrapWidth = game.world.width - textObject.getBounds().x * 2;

        return textObject;
    }

    var click = {
        menu: function () {
            game.state.start( this.game.state.states[ "Help" ].back );
        }
    };

    return function () {
        // Close button
        button( 200, 40, "Close", click.menu, "button" );

        // Help text
        text( this.game.state.states[ "Help" ].text );
    };
} );