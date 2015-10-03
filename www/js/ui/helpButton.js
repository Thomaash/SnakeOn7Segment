define( [ "ui/button" ], function ( button ) {
    return function ( x, y, page ) {
        if ( !game.vars.help ) {
            return;
        }

        return button(
            x,
            y,
            "?",
            function () {
                game.state.start( "Help", undefined, undefined, page, game.state.current );
            },
            "buttonSquare"
        );
    };
} );