define( [], function () {
    return {
        turn : function ( x ) {
            game.vars.snake.turn( x < window.innerWidth / 2 ? "left" : "right" );
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
            switch ( keyCode ) {
                case 37: // ←
                    game.vars.snake.nextDir( "l" );
                    break;
                case 38: // ↑
                    game.vars.snake.nextDir( "t" );
                    break;
                case 39: // →
                    game.vars.snake.nextDir( "r" );
                    break;
                case 40: // ↓
                    game.vars.snake.nextDir( "b" );
                    break;
                case 13: // Enter
                case 27: // Escape
                case 32: // Space bar
                    this.click();
                    break;
            }
        }
    };
} );