define( [ "tools/storage" ], function ( storage ) {
    return {
        save: function () {
            storage.save( "help" );
        },
        load: function () {
            storage.load( "help" );
        }
    };
} );