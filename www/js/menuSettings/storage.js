define( [ "tools/storage" ], function ( storage ) {
    return {
        save: function () {
            storage.save( "help", "help" );
        },
        load: function () {
            console.log( "menuSettings/storage" );
            storage.load( "help", "help" );
        }
    };
} );