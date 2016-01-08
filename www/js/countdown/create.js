define(
    [ "ui/button", "segment/Seven", "ui/text" ],
    function ( button, SevenSegment, text ) {
        function clickMenu() {
            game.state.start( game.vars.gameType === "classic" ? "MenuMain" : "MenuPlay" );
        }

        function showSprite( group, x, y, a, spriteName, frameName ) {
            var sprite = group.create( x, y, spriteName, 0 );
            sprite.anchor.setTo( 0.5, 0.5 );
            sprite.angle = a;

            if ( frameName != null ) {
                sprite.frameName = frameName;
            }
        }

        return function () {
            game.vars.countDown = 3;
            game.vars.update = 60;

            // Groups
            var leds  = game.add.group(),
                lines = game.add.group(),
                ui    = game.add.group();

            // Create menu button
            button( 200, 40, "Menu", clickMenu, "button" );


            // Help UI
            var help = "Tap left half of the screen to turn left, right to turn right.";
            if ( game.vars.multiplayer ) {
                // Arrows
                showSprite( ui, game.world.width * 0.25, game.world.height * 0.2, 90, "Arrows" );
                showSprite( ui, game.world.width * 0.25, game.world.height * 0.8, 270, "Arrows" );
                showSprite( ui, game.world.width * 0.75, game.world.height * 0.2, 90, "Arrows" );
                showSprite( ui, game.world.width * 0.75, game.world.height * 0.8, 270, "Arrows" );

                // LEDs
                showSprite( ui, game.world.width * 0.75, game.world.height * 0.5, 0, "LEDs", "vgreenYellow" );
                showSprite( ui, game.world.width * 0.25, game.world.height * 0.5, 0, "LEDs", "vgreen" );

                // Texts
                text( help, ui, game.world.width * 0.70, game.world.height * 0.5, -90, game.world.height );
                text( help, ui, game.world.width * 0.30, game.world.height * 0.5, 90, game.world.height );
            } else {
                // Arrows
                showSprite( ui, game.world.width * 0.2, game.world.height * 0.5, 0, "Arrows" );
                showSprite( ui, game.world.width * 0.8, game.world.height * 0.5, 180, "Arrows" );

                // LED
                showSprite( ui, game.world.width * 0.5, game.world.height * 0.2, 0, "LEDs", "hgreen" );

                // Text
                text( help, ui );
            }


            // Help UI lines
            var graphics = game.add.graphics( 0, 0 );
            graphics.lineStyle( 4, 0x444444 );

            // Vertical line
            graphics.moveTo( game.world.width / 2, 0 );
            graphics.lineTo( game.world.width / 2, game.world.height );

            // Horizontal line
            if ( game.vars.multiplayer ) {
                graphics.moveTo( 0, game.world.height / 2 );
                graphics.lineTo( game.world.width, game.world.height / 2 );
            }

            // Add lines to group
            lines.add( graphics );


            // Create segment
            game.vars.segments = new SevenSegment( leds, 3, 1 );
        };
    }
);