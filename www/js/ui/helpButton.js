define( [ "state/game", "ui/button" ], function ( game, button ) {
    return function ( x, y, page ) {
        // Do not show anything if help is disabled
        if ( !game.vars.help ) {
            return;
        }

        return button(
            x, y, "?",
            function () {
                // Start "Help" state, pass help page (according to page var) as 1st custom param and current state as 2nd
                game.state.start( "Help", undefined, undefined, page, game.state.current );
            },
            "buttonSquare"
        );
    };
} );
