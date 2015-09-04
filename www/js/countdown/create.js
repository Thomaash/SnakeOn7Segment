define(
    [ "ui/button", "segment/Seven", "ui/centerScreenText" ],
    function ( button, SevenSegment, centerScreenText ) {
        function clickMenu() {
            game.state.start( "MainMenu" );
        }

        return function () {
            game.vars.countDown = 3;
            game.vars.update = 60;

            // Create menu button
            button( 200, 40, "Menu", clickMenu, "button" );

            // Groups
            game.vars.groups.leds = game.add.group();
            var ui = game.add.group();

            // Help UI arrows
            var x          = game.world.width, y = game.world.height / 2,
                leftArrow  = ui.create( x * 0.1, y, "Arrows", 0 ),
                rightArrow = ui.create( x * 0.9, y, "Arrows", 1 );
            leftArrow.anchor.setTo( 0.5, 0.5 );
            rightArrow.anchor.setTo( 0.5, 0.5 );

            // Help UI text
            centerScreenText( "Tap left half of the screen to turn left, right to turn right.", ui );

            // Create segment
            game.vars.segments = new SevenSegment( 3, 1 );
        };
    }
);