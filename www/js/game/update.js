define( [ "segment/Seven" ], function ( SevenSegment ) {
    return function () {
        if ( ++game.vars.update >= game.vars.speed ) {
            game.vars.update = 0;

            if ( game.vars.clickAction === "turn" ) {
                // Snake
                if ( !game.vars.snake.move() ) {
                    game.vars.snake.die();
                    game.vars.clickAction = "click";
                    game.vars.speed = 120;

                    // End game, prevents enemy from moving and food from disappearing after death
                    return;
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
                for ( var i = 0; i < game.vars.enemies.length; i++ ) {
                    game.vars.enemies[ i ].move();
                }
            } else {
                game.state.start( "Score" );
            }
        }
    };
} );