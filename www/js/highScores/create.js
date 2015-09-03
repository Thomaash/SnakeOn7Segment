define(
    [ "ui/button", "ui/createButton", "tools/score", "tools/ordinal" ],
    function ( button, createButton, score, ordinal ) {
        function clickMenu() {
            game.state.start( "MainMenu" );
        }

        function clickReset() {
            score.reset();
            game.state.start( "HighScores" );
        }

        return function () {
            var x, y, i,
                scores = score.load();

            // Menu and reset buttons
            createButton( { x: 200, y: 72 }, "Menu", clickMenu );
            createButton( { x: 200, y: game.world.height - 72 }, "Reset", clickReset );

            // Classic
            x = game.world.centerX;
            y = 40;
            // Header
            button( x, y, "Classic", null, "button" );
            y += 80;
            // Scores
            if ( scores.classic != null ) {
                for ( i = 0; i < scores.classic.length && i < 9; i++ ) {
                    button( x, y, ordinal( i + 1 ) + ": " + scores.classic[ i ] + " LEDs", null, "button" );
                    y += 80;
                }
            } else {
                button( x, y, "No scores yet", null, "button" );
            }

            // Single
            x = game.world.centerX + 360;
            y = 40;
            // Header
            button( x, y, "Single", null, "button" );
            y += 80;
            // Scores
            if ( scores.single != null ) {
                for ( i = 0; i < scores.single.length && i < 9; i++ ) {
                    button( x, y, ordinal( i + 1 ) + ": " + scores.single[ i ] + " LEDs", null, "button" );
                    y += 80;
                }
            } else {
                button( x, y, "No scores yet", null, "button" );
            }
        };
    }
);