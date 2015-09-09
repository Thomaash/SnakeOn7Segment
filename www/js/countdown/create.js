define(
    [ "ui/button", "segment/Seven", "ui/centerScreenText" ],
    function ( button, SevenSegment, centerScreenText ) {
        function clickMenu() {
            game.state.start( "MainMenu" );
        }

        function createArrow( group, x, y, a ) {
            var leftArrow = group.create( x, y, "Arrows", 0 );
            leftArrow.anchor.setTo( 0.5, 0.5 );
            leftArrow.angle = a;
        }

        return function () {
            game.vars.countDown = 3;
            game.vars.update = 60;

            // Create menu button
            button( 200, 40, "Menu", clickMenu, "button" );

            // Groups
            var leds = game.add.group(),
                ui   = game.add.group();

            // Help UI arrows
            if ( game.vars.multiplayer ) {
                createArrow( ui, game.world.width * 0.25, game.world.height * 0.2, 90 );
                createArrow( ui, game.world.width * 0.25, game.world.height * 0.8, 270 );
                createArrow( ui, game.world.width * 0.75, game.world.height * 0.2, 90 );
                createArrow( ui, game.world.width * 0.75, game.world.height * 0.8, 270 );
            } else {
                createArrow( ui, game.world.width * 0.2, game.world.height * 0.5, 0 );
                createArrow( ui, game.world.width * 0.8, game.world.height * 0.5, 180 );
            }

            // Help UI text
            centerScreenText( "Tap left half of the screen to turn left, right to turn right.", ui );

            // Create segment
            game.vars.segments = new SevenSegment( leds, 3, 1 );
        };
    }
);