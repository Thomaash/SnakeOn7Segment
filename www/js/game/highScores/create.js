define( [ "ui/createButton" ], function ( createButton ) {
    function clickMenu() {
        game.state.start( "MainMenu" );
    }

    return function () {
        createButton( { x: 200, y: 40 }, "Menu", clickMenu );

        var scores = score.load();
        if ( scores != null ) {
            for ( var i = 0; i < scores.length && i < 9; i++ ) {
                createButton( i - 5, (i + 1) + ": " + scores[ i ] );
            }
        } else {
            createButton( 0, "No scores yet", clickMenu );
        }
    };
} );