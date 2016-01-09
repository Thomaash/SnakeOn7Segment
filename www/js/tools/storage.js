define( [ "state/game" ], function ( game ) {
    return {
        prefix       : function ( name ) {return "So7S_" + name;},
        save         : function ( name, value ) {
            if ( value == null ) {
                value = game.vars[ name ];
            }

            localStorage.setItem( this.prefix( name ), value );
        },
        load         : function ( name ) {
            game.vars[ name ] = this.loadRet( name );
        },
        loadRet      : function ( name ) {
            var value        = localStorage.getItem( this.prefix( name ) ),
                defaultValue = this.defaults[ name ];

            if ( value == null ) {
                return defaultValue;
            } else {
                switch ( typeof defaultValue ) {
                    case "boolean":
                        return value === "true";
                        break;
                    case "number":
                        return isNaN( value ) ? defaultValue : value;
                        break;
                    default:
                        return value;
                }
            }
        },
        clearSettings: function () {
            var key;

            for ( key in localStorage ) {
                if ( localStorage.hasOwnProperty( key ) && /^So7S_/.exec( key ) ) {
                    localStorage.removeItem( key );
                }
            }
            for ( key in this.defaults ) {
                if ( this.defaults.hasOwnProperty( key ) ) {
                    switch ( key ) {
                        case "level":
                            game.vars[ key ].load( this.defaults[ key ] );
                            break;
                        default:
                            game.vars[ key ] = this.defaults[ key ];
                            break;
                    }
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
            help       : true,
            level      : 10
        }
    };
} );