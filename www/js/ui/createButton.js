define( [ "ui/button" ], function ( button ) {
    return function ( position, text, callback ) {
        button(
            game.world.centerX, game.world.centerY + 80 + 80 * position,
            text, callback, "button"
        );
    };
} );