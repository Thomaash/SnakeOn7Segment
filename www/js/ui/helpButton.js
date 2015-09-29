define( [ "ui/button" ], function ( button ) {
    return function ( x, y, page ) {
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