define( [], function () {
    return function () {
        // Delete UI
        game.vars.ui.elements.leftArrow = null;
        game.vars.ui.elements.rightArrow = null;
        game.vars.ui.elements.centerScreenText = null;

        // Delete segments
        game.vars.segments = null;


        // Prepare new game

        // Set game state
        game.vars.snake = [];
        game.vars.food = null;
        game.vars.snakeLength = 0;
        game.vars.direction = { previous: "r", next: "r" };
        game.vars.update = 0;
        game.vars.countDown = 3;
    };
} );