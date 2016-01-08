define(
    [ "state/game", "ui/button", "tools/score", "tools/ordinal" ],
    function ( game, button, score, ordinal ) {
        var click = {
            menu : function () {
                game.state.start( "MenuMain" );
            },
            reset: function () {
                score.reset();
                game.state.start( "HighScores" );
            }
        };

        function showScores( title, scores, x, y ) {
            // Header
            button( x, y, title, null, "button" );
            y += 80;

            // Scores
            if ( scores != null ) {
                for ( var i = 0; i < scores.length && i < 9; i++ ) {
                    button( x, y, ordinal( i + 1 ) + ": " + scores[ i ] + " points", null, "button" );
                    y += 80;
                }
            } else {
                button( x, y, "No scores yet", null, "button" );
            }
        }

        return function () {
            var scores = score.load();

            // Menu and reset buttons
            button( 200, 72, "Menu", click.menu, "button" );
            button( 200, game.world.height - 72, "Reset", click.reset, "button" );

            // High scores
            showScores( "Classic", scores.classic, game.world.centerX, 40 );
            showScores( "Single", scores.single, game.world.centerX + 360, 40 );
        };
    }
);