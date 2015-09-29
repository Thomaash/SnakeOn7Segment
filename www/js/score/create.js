define(
    [ "ui/button", "tools/score", "segment/Seven" ],
    function ( button, score, SevenSegment ) {
        var click = {
            menu: function () { game.state.start( game.vars.gameType === "classic" ? "MenuMain" : "MenuPlay" ); },
            play: function () { game.state.start( "Countdown" ); }
        };

        function createDisplay( text, color, position ) {
            var group  = game.add.group(),
                // Big segments will fill whole screen, small less than half
                length = game.vars.quality === 160 ? 6 : 5;
            text = (new Array( length + 1 ).join( " " ) + text).slice( -length );

            for ( var i = 0; i < length; i++ ) {
                var segment = new SevenSegment( group, i, 0, game.vars.quality / 160 );
                segment.setState( text[ i ] === " " ? "off" : text[ i ], color );
            }

            group.x = (game.world.width - group.width) * position; // 1 for right, 0 for left
            group.y = game.world.height - group.height;
        }

        return function () {
            var message = "";

            // Create menu button
            button( 200, 40, "Menu", click.menu, "button" );
            button( game.world.width - 200, 40, "Play!", click.play, "button" );

            switch ( game.vars.gameType ) {
                case "classic":
                    var levelChange, color,
                        playerScore = game.vars.scores[ 0 ];

                    // Set LED color and levelChange
                    if ( playerScore >= game.vars.LEDCount / 2 ) {
                        color = SevenSegment.prototype.state.led.green;
                        levelChange = 10;
                        message = "Awesome";
                    } else if ( playerScore >= game.vars.LEDCount / 3 ) {
                        color = SevenSegment.prototype.state.led.darkGreen;
                        levelChange = 5;
                        message = "Good job, but to proceed faster, get even higher score.";
                    } else if ( playerScore >= game.vars.LEDCount / 4 ) {
                        color = SevenSegment.prototype.state.led.yellow;
                        levelChange = 1;
                        message = "Not bad, but to proceed faster, get higher score.";
                    } else {
                        color = SevenSegment.prototype.state.led.red;
                        levelChange = -10;
                        message = "You won't proceed to next level this way, get higher score.";
                    }

                    // Save level
                    game.vars.level.add( 0, levelChange );

                    // Show and save score
                    createDisplay( playerScore, color, 1 );
                    score.save( game.vars.gameType, playerScore );
                    break;
                case "single":
                    // First player
                    createDisplay( game.vars.scores[ 0 ], SevenSegment.prototype.state.led.green, 1 );
                    score.save( game.vars.gameType, game.vars.scores[ 0 ] );

                    // Second player
                    if ( game.vars.multiplayer ) {
                        createDisplay( game.vars.scores[ 1 ], SevenSegment.prototype.state.led.greenYellow, 0 );
                        score.save( game.vars.gameType, game.vars.scores[ 1 ] );
                    }
                    break;
            }
        };
    }
);