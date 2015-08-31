define( [ "game/preload", "game/create", "game/shutdown" ], function ( preload, create, shutdown ) {
    return {
        preload : preload,
        create  : create,
        shutdown: shutdown,
        update  : function () {
            game.vars.functions.update();
        }
    };
} );