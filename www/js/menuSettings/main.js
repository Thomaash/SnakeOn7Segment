define( [ "menuPlay/preload", "menuSettings/create", "menuSettings/storage" ], function ( preload, create, storage ) {
    return {
        preload : preload,
        create  : create,
        shutdown: function () {
            storage.save();
        }
    };
} );