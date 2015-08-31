define(
    [ "preStart/preload", "preStart/create", "preStart/update", "preStart/shutdown" ],
    function ( preload, create, update, shutdown ) {
        return {
            preload : preload,
            create  : create,
            update  : update,
            shutdown: shutdown
        };
    }
);