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
            storage.load( "rows", "rows" );
            storage.load( "speed", "speed" );
            storage.load( "walled", "walledMap" );
            storage.load( "holes", "holesInMap" );
            storage.load( "enemy", "enemy" );
            storage.load( "multiplayer", "multiplayer" );
        }
    };
} );