define(
    [ "game/preload", "game/create", "game/update", "game/shutdown" ],
    function ( preload, create, update, shutdown ) {
        return {
            preload : preload,
            create  : create,
            shutdown: shutdown,
            update  : update
        };
    }
);