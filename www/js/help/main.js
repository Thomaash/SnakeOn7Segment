define( [ "help/init", "menuPlay/preload", "help/create" ], function ( init, preload, create ) {
    return {
        init   : init,
        preload: preload,
        create : create
    };
} );