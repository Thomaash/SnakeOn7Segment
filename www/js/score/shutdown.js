define( [ "state/game" ], function ( game ) {
    return function () {
        // Delete attributes
        game.vars.scores = null;
    };
} );