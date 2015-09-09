define( [], function () {
    return {
        turn : function ( x, y ) {
            if ( game.vars.multiplayer ) {
                var player,
                    condition = y < window.innerHeight / 2;

                if ( x < window.innerWidth / 2 ) {
                    player = 0;
                } else {
                    player = 1;
                    condition = !condition;
                }

                game.vars.snakes[ player ].turn( condition ? "left" : "right" );
            } else {
                game.vars.snakes[ 0 ].turn( x < window.innerWidth / 2 ? "left" : "right" );
            }
        },
        click: function () {
            switch ( game.state.getCurrentState().key ) {
                case  "Countdown":
                    game.state.start( "Game" );
                    break;
                case  "Game":
                    game.state.start( "Score" );
                    break;
                case  "Score":
                    switch ( game.vars.gameType ) {
                        case "classic":
                            game.state.start( "Countdown" );
                            break;
                        case "single":
                            game.state.start( "MenuPlay" );
                            break;
                    }
                    break;
            }
        },
        keys : function ( keyCode ) {
            try {
                switch ( keyCode ) {
                    case 37: // ←
                        game.vars.snakes[ 0 ].nextDir( "l" );
                        break;
                    case 38: // ↑
                        game.vars.snakes[ 0 ].nextDir( "t" );
                        break;
                    case 39: // →
                        game.vars.snakes[ 0 ].nextDir( "r" );
                        break;
                    case 40: // ↓
                        game.vars.snakes[ 0 ].nextDir( "b" );
                        break;
                    case 65: // ←
                        game.vars.snakes[ 1 ].nextDir( "l" );
                        break;
                    case 87: // ↑
                        game.vars.snakes[ 1 ].nextDir( "t" );
                        break;
                    case 68: // →
                        game.vars.snakes[ 1 ].nextDir( "r" );
                        break;
                    case 83: // ↓
                        game.vars.snakes[ 1 ].nextDir( "b" );
                        break;
                    case 13: // Enter
                    case 27: // Escape
                    case 32: // Space bar
                        this.click();
                        break;
                }
            } catch ( e ) { }
        }
    };
} );