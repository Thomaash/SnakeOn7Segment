define( [ "menuPlay/preload", "menuPlay/create", "menuPlay/storage" ], function ( preload, create, storage ) {
    return {
        init    : function () { storage.load(); },
        preload : preload,
        create  : create,
        shutdown: function () { storage.save(); }
    };
} );