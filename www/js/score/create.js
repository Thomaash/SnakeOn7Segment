define( [ "ui/createButton", "tools/score", "segment/Seven" ], function ( createButton, score, SevenSegment ) {
    function clickMenu() {
        game.state.start( "MainMenu" );
    }

    return function () {
        var scoreInt = game.vars.snakeLength + 1,
            scoreStr = ("      " + (game.vars.snakeLength + 1)).slice( -6 ),
            levelChange, color, message;
        game.vars.countDown = 3;
        game.vars.ui.font.size = 24;
        game.vars.update = 60;

        // Save score
        score.save( scoreInt );

        // Create menu button
        createButton( { x: 200, y: 40 }, "Menu", clickMenu );

        // Groups
        game.vars.groups.leds = game.add.group();
        game.vars.groups.ui = game.add.group();

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

        // Save level
        game.vars.level.add( 0, levelChange );

        // Help UI text
        game.vars.ui.elements.centerScreenText = new Phaser.Text(
            game,
            game.world.centerX, game.world.height / 3,
            message +
            "\n\n" +
            "Tap anywhere to continue",
            { font: game.vars.ui.font.get(), fill: "#ddd", align: "center" }
        );
        game.vars.groups.ui.add( game.vars.ui.elements.centerScreenText );
        game.vars.ui.elements.centerScreenText.anchor.set( 0.5, 0.5 );
        game.vars.ui.elements.centerScreenText.wordWrap = true;
        game.vars.ui.elements.centerScreenText.wordWrapWidth = game.world.width - 50;

        // Create segments
        game.vars.segments = [];
        for ( var i = 0; i < 6; i++ ) {
            var segment = new SevenSegment( i, 1 );
            segment.setState( scoreStr[ i ] === " " ? "off" : scoreStr[ i ], color );

            game.vars.segments[ game.vars.segments.length ] = segment;
        }
    };
} );