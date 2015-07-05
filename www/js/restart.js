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
    var x = game.world.width, y = (game.world.height - 90) / 2;
    game.vars.ui.arrow.l = game.add.sprite( 45, y, "Arrows", 0 );
    game.vars.ui.arrow.r = game.add.sprite( x - 90 - 45, y, "Arrows", 1 );

    // Add snake into map
    game.vars.snake.push( game.vars.map.map[ 0 ][ 0 ].rb );
    game.vars.snake[ game.vars.snake.length - 1 ].setState( 3 );
}