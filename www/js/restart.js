function restart() {
    // Set game state
    game.vars.snake = [];
    game.vars.food = null;
    game.vars.snakeLength = 0;
    game.vars.direction = { previous: "r", next: "r" };
    game.vars.state = "run";
    game.vars.update = 60;
    game.vars.countDown = 3;
    game.vars.functions.update = updateCountDown;

    // Clean map
    cleanMap();

    // Create help
    game.vars.ui.elements.leftArrow.visible = true;
    game.vars.ui.elements.rightArrow.visible = true;
    game.vars.ui.elements.centerScreenText.visible = false;

    // Add snake to map
    game.vars.snake.push( game.vars.map.map[ 0 ][ 0 ].rb );
    game.vars.snake[ game.vars.snake.length - 1 ].setState( LED.prototype.state.snakeHead );

    // Set game speed, 40 for 1st level, 10 minimum
    game.vars.speed = 50 - game.vars.level.floor() * 5;
    if ( game.vars.speed < 10 ) {
        game.vars.speed = 10;
    }
}