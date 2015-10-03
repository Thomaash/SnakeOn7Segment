define( [], function () {
    return {
        save   : function () {
            this.saveOne( "rows", "rows" );
            this.saveOne( "speed", "speed" );
            this.saveOne( "walled", "walledMap" );
            this.saveOne( "holes", "holesInMap" );
            this.saveOne( "enemy", "enemy" );
            this.saveOne( "multiplayer", "multiplayer" );
            this.saveOne( "help", "help" );
        },
        load   : function () {
            this.loadOne( "rows", "rows", 2 );
            this.loadOne( "speed", "speed", 40 );
            this.loadOne( "walled", "walledMap", true );
            this.loadOne( "holes", "holesInMap", false );
            this.loadOne( "enemy", "enemy", 0 );
            this.loadOne( "multiplayer", "multiplayer", false );
            this.loadOne( "help", "help", true );
        },
        saveOne: function ( saveName, gameName ) {
            localStorage.setItem( "So7S_" + saveName, game.vars[ gameName ] );
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
                    case "number":
                        game.vars[ gameName ] = value;
                        if ( isNaN( game.vars[ gameName ] ) ) {
                            game.vars[ gameName ] = defaultValue;
                        }
                        break;
                    default:
                        game.vars[ gameName ] = value;
                }
            }
        }
    };
} );