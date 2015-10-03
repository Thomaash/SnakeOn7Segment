define( [ "menuPlay/preload", "menuSettings/create", "menuSettings/storage" ], function ( preload, create, storage ) {
    return {
        init    : function () { storage.load(); },
        preload : preload,
        create  : create,
        shutdown: function () { storage.save(); }
    };
} );