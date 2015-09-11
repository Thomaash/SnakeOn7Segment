define( [ "segment/Seven" ], function ( SevenSegment ) {
    return function () {
        if ( --game.vars.update < 0 ) {
            var i;
            game.vars.update = 120 / game.vars.speed;

            // Snakes
            // Prepare new locations
            for ( i = 0; i < game.vars.snakes.length; i++ ) {
                game.vars.snakes[ i ].move();
            }
            // Change LEDs colors
            for ( i = 0; i < game.vars.snakes.length; i++ ) {
                game.vars.snakes[ i ].changeLeds();
            }

            // Food
            if ( game.vars.food == null ) {
                // Add food if not present
                var foodLED = game.vars.map.getRandomLED();

                if ( foodLED.getState() === SevenSegment.prototype.state.led.empty ) {
                    foodLED.setState( SevenSegment.prototype.state.led.food );
                    foodLED.life = 2 * (game.vars.rows + game.vars.cols);
                    game.vars.food = foodLED;
                }
            } else {
                // Randomly remove food
                game.vars.food.life -= Math.random();

                if ( game.vars.food.life < 0 ) {
                    game.vars.food.setState( SevenSegment.prototype.state.led.empty );
                    game.vars.food = null;
                }
            }

            // Enemies
            for ( i = 0; i < game.vars.enemies.length; i++ ) {
                game.vars.enemies[ i ].move();
            }
        }
    };
} );