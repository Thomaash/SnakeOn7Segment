define( [], function () {
    return {
        save   : function () {
            this.saveOne( "rows", "rows" );
            this.saveOne( "speed", "speed" );
            this.saveOne( "walled", "walledMap" );
            this.saveOne( "holes", "holesInMap" );
            this.saveOne( "enemy", "enemy" );
        },
        saveOne: function ( saveName, gameName ) {
            localStorage.setItem( "So7S_" + saveName, game.vars[ gameName ] );
        },
        load   : function () {
            this.loadOne( "rows", "rows", 2 );
            this.loadOne( "speed", "speed", 40 );
            this.loadOne( "walled", "walledMap", true );
            this.loadOne( "holes", "holesInMap", false );
            this.loadOne( "enemy", "enemy", false );
        },
        loadOne: function ( saveName, gameName, defaultValue ) {
            var value = localStorage.getItem( "So7S_" + saveName );
            if ( value == null ) {
                game.vars[ gameName ] = defaultValue;
            } else {
                switch ( typeof defaultValue ) {
                    case "boolean":
                        game.vars[ gameName ] = value === "true";
                        break;
                    default:
                        game.vars[ gameName ] = value
                }
            }
        }
    };
} );