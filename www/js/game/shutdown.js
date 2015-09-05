define( [], function () {
    return function () {
        // Delete map
        game.vars.map = null;
        game.vars.segments = null;

        game.vars.clickAction = "click";
    };
} );