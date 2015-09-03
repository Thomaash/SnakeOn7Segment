define( [ "countdown/preload", "score/create", "score/shutdown" ], function ( preload, create, shutdown ) {
    return {
        preload : preload,
        create  : create,
        shutdown: shutdown
    };
} );