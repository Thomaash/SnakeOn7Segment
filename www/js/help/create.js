define( [ "ui/button", "ui/text" ], function ( button, text ) {
    var click = {
        menu: function () {
            game.state.start( this.game.state.states[ "Help" ].back );
        }
    };

    return function () {
        // Close button
        button( 200, 40, "Close", click.menu, "button" );

        // Help text
        text( this.game.state.states[ "Help" ].text, game.add.group() );
    };
} );