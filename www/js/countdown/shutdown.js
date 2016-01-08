define( [ "state/game" ], function ( game ) {
    return function () {
        // Delete segments
        game.vars.segments = null;
    };
} );