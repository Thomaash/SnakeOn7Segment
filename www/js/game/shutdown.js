define( [], function () {
    return function () {
        // Set score attribute
        game.vars.scores=[];
        for ( var i = 0; i < game.vars.snakes.length; i++ ) {
            game.vars.scores[ i ] = game.vars.snakes[ i ].length();
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