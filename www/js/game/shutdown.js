define( [], function () {
    return function () {
        // Set score attribute
        game.vars.score = game.vars.snake.length();

        // Delete attributes
        game.vars.food = null;
        game.vars.map = null;
        game.vars.segments = null;
        game.vars.snake = null;

        game.vars.clickAction = "click";
    };
} );