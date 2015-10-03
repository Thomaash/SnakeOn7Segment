define( [ "tools/storage" ], function ( storage ) {
    return {
        save: function () {
            storage.save( "rows", "rows" );
            storage.save( "speed", "speed" );
            storage.save( "walled", "walledMap" );
            storage.save( "holes", "holesInMap" );
            storage.save( "enemy", "enemy" );
            storage.save( "multiplayer", "multiplayer" );
        },
        load: function () {
            storage.load( "rows", "rows", 2 );
            storage.load( "speed", "speed", 40 );
            storage.load( "walled", "walledMap", true );
            storage.load( "holes", "holesInMap", false );
            storage.load( "enemy", "enemy", 0 );
            storage.load( "multiplayer", "multiplayer", false );
        }
    };
} );