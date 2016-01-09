define( [ "tools/storage" ], function ( storage ) {
    return {
        save: function () {
            storage.save( "rows" );
            storage.save( "speed" );
            storage.save( "walledMap" );
            storage.save( "holesInMap" );
            storage.save( "enemy" );
            storage.save( "multiplayer" );
        },
        load: function () {
            storage.load( "rows" );
            storage.load( "speed" );
            storage.load( "walledMap" );
            storage.load( "holesInMap" );
            storage.load( "enemy" );
            storage.load( "multiplayer" );
        }
    };
} );