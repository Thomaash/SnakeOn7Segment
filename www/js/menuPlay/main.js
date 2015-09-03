define( [ "menuPlay/preload", "menuPlay/create", "menuPlay/storage" ], function ( preload, create, storage ) {
    return {
        preload : preload,
        create  : create,
        shutdown: storage.save
    };
} );