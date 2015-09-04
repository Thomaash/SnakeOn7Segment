define( [], function () {
    return function () {
        // Delete segments
        game.vars.segments = null;


        // Prepare new game

        // Set game state
        game.vars.snake = [];
        game.vars.food = null;
        game.vars.snakeLength = 0;
        game.vars.direction = { previous: "r", next: "r" };
        game.vars.update = 0;
    };
} );