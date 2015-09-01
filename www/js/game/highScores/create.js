define( [ "ui/createButton", "tools/score" ], function ( createButton, score ) {
    function clickMenu() {
        game.state.start( "MainMenu" );
    }

    function ordinal( number ) {
        switch ( String( number ).slice( -1 ) ) {
            case "1":
                return number + "st";
            case "2":
                return number + "nd";
            case "3":
                return number + "rd";
            default:
                return number + "th";
        }
    }

    return function () {
        createButton( { x: 200, y: 40 }, "Menu", clickMenu );

        var scores = score.load();
        if ( scores != null ) {
            var offset = Math.floor( scores.length / 2 ) + 1;
            for ( var i = 0; i < scores.length && i < 9; i++ ) {
                createButton( i - offset, ordinal( i + 1 ) + ": " + scores[ i ] + " LEDs" );
            }
        } else {
            createButton( 0, "No scores yet", clickMenu );
        }
    };
} );