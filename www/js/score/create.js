define(
    [ "ui/button", "tools/score", "segment/Seven", "ui/centerScreenText" ],
    function ( button, score, SevenSegment, centerScreenText ) {
        function clickMenu() {
            game.state.start( "MainMenu" );
        }

        return function () {
            var scoreInt = game.vars.snakeLength + 1,
                scoreStr = ("      " + (game.vars.snakeLength + 1)).slice( -6 ),
                levelChange, color, message;
            game.vars.update = 60;

            // Create menu button
            button( 200, 40, "Menu", clickMenu, "button" );

            // Groups
            var leds = game.add.group(),
                ui   = game.add.group();

            // Set LED color and levelChange
            if ( scoreStr >= game.vars.LEDCount / 2 ) {
                color = SevenSegment.prototype.state.led.green;
                levelChange = 10;
                message = "Awesome";
            } else if ( scoreStr >= game.vars.LEDCount / 3 ) {
                color = SevenSegment.prototype.state.led.darkGreen;
                levelChange = 5;
                message = "Good job, but to proceed faster, get even higher score.";
            } else if ( scoreStr >= game.vars.LEDCount / 4 ) {
                color = SevenSegment.prototype.state.led.yellow;
                levelChange = 1;
                message = "Not bad, but to proceed faster, get higher score.";
            } else {
                color = SevenSegment.prototype.state.led.red;
                levelChange = -10;
                message = "You won't proceed to next level this way, get higher score.";
            }

            switch ( game.vars.gameType ) {
                case "classic":
                    // Save level
                    game.vars.level.add( 0, levelChange );
                    break;
                case "single":
                    message = "";
                    break;
            }

            // Save score
            score.save( game.vars.gameType, scoreInt );

            // Help UI text
            centerScreenText( message + "\n\n" + "Tap anywhere to continue", ui );

            // Create segments
            game.vars.segments = [];
            for ( var i = 0; i < 6; i++ ) {
                var segment = new SevenSegment( leds, i, 1 );
                segment.setState( scoreStr[ i ] === " " ? "off" : scoreStr[ i ], color );

                game.vars.segments[ game.vars.segments.length ] = segment;
            }
        };
    }
);