define( [ "state/game" ], function ( game ) {
    return {
        prefix       : function ( name ) {return "So7S_" + name;},
        save         : function ( name ) {
            localStorage.setItem( this.prefix( name ), game.vars[ name ] );
        },
        load         : function ( name ) {
            var value        = localStorage.getItem( this.prefix( name ) ),
                defaultValue = this.defaults[ name ];

            if ( value == null ) {
                game.vars[ name ] = defaultValue;
            } else {
                switch ( typeof defaultValue ) {
                    case "boolean":
                        game.vars[ name ] = value === "true";
                        break;
                    case "number":
                        game.vars[ name ] = value;
                        if ( isNaN( game.vars[ name ] ) ) {
                            game.vars[ name ] = defaultValue;
                        }
                        break;
                    default:
                        game.vars[ name ] = value;
                }
            }
        },
        clearSettings: function () {
            for ( var key in this.defaults ) {
                if ( this.defaults.hasOwnProperty( key ) ) {
                    localStorage.removeItem( this.prefix( key ) );
                    game.vars[ key ] = this.defaults[ key ];
                }
            }
        },
        defaults     : {
            rows       : 2,
            speed      : 6,
            walledMap  : true,
            holesInMap : false,
            enemy      : 0,
            multiplayer: false,
            help       : true
        }
    };
} );