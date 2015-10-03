define( [ "tools/storage" ], function ( storage ) {
    return {
        save: function () {
            storage.save( "help", "help" );
        },
        load: function () {
            storage.load( "help", "help", true );
        }
    };
} );