define( [ "ui/createButton" ], function ( createButton ) {
    function clickMenu() {
        game.state.start( "MainMenu" );
    }

    return function () {
        var score = ("      " + (game.vars.snakeLength + 1)).slice( -6 );
        game.vars.countDown = 3;
        game.vars.ui.font.size = 24;
        game.vars.update = 60;

        // Create menu button
        createButton( { x: 200, y: 40 }, "Menu", clickMenu );

        // Groups
        game.vars.groups.leds = game.add.group();
        game.vars.groups.ui = game.add.group();

        // Help UI text
        game.vars.ui.elements.centerScreenText = new Phaser.Text(
            game,
            game.world.centerX, game.world.height / 3,
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
            segment.setState( score[ i ] === " " ? "off" : score[ i ] );

            game.vars.segments[ game.vars.segments.length ] = segment;
        }
    };
} );