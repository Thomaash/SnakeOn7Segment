define( [ "ui/createButton" ], function ( createButton ) {
    function clickMenu() {
        game.state.start( "MainMenu" );
    }

    return function () {
        game.vars.countDown = 3;
        game.vars.ui.font.size = 24;
        game.vars.update = 60;

        // Create menu button
        createButton( { x: 200, y: 40 }, "Menu", clickMenu );

        // Groups
        game.vars.groups.leds = game.add.group();
        game.vars.groups.ui = game.add.group();

        // Help UI arrows
        var x = game.world.width, y = game.world.height / 2;
        game.vars.ui.elements.leftArrow = game.vars.groups.ui.create( x * 0.1, y, "Arrows", 0 );
        game.vars.ui.elements.rightArrow = game.vars.groups.ui.create( x * 0.9, y, "Arrows", 1 );
        game.vars.ui.elements.leftArrow.anchor.setTo( 0.5, 0.5 );
        game.vars.ui.elements.rightArrow.anchor.setTo( 0.5, 0.5 );

        // Help UI text
        game.vars.ui.elements.centerScreenText = new Phaser.Text(
            game,
            game.world.centerX, game.world.height / 3,
            "Tap left half of the screen to turn left, right to turn right.",
            { font: game.vars.ui.font.get(), fill: "#ddd", align: "center" }
        );
        game.vars.groups.ui.add( game.vars.ui.elements.centerScreenText );
        game.vars.ui.elements.centerScreenText.anchor.set( 0.5, 0.5 );
        game.vars.ui.elements.centerScreenText.wordWrap = true;
        game.vars.ui.elements.centerScreenText.wordWrapWidth = game.world.width - 50;

        // Create segment
        game.vars.segments = [ [ new SevenSegment( 3, 1 ) ] ];
    };
} );