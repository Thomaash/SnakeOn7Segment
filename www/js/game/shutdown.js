define( [], function () {
    return function () {
        // Set score attribute
        var scoreMultiplier = game.vars.gameType === "single"
            ? game.vars.speed / (game.vars.LEDCount / 100)
            : 1;
        game.vars.scores = [];
        for ( var i = 0; i < game.vars.snakes.length; i++ ) {
            game.vars.scores[ i ] = Math.round( game.vars.snakes[ i ].length() * scoreMultiplier );
        }

        // Delete attributes
        game.vars.enemies = null;
        game.vars.food = null;
        game.vars.map = null;
        game.vars.segments = null;
        game.vars.snakes = null;

        game.vars.clickAction = "click";
    };
} );