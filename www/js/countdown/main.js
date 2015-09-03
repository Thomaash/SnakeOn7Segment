define(
    [ "countdown/preload", "countdown/create", "countdown/update", "countdown/shutdown" ],
    function ( preload, create, update, shutdown ) {
        return {
            preload : preload,
            create  : create,
            update  : update,
            shutdown: shutdown
        };
    }
);