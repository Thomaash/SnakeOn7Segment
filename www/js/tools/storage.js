define( [], function () {
    return {
        save: function ( saveName, gameName ) {
            localStorage.setItem( "So7S_" + saveName, game.vars[ gameName ] );
        },
        load: function ( saveName, gameName, defaultValue ) {
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