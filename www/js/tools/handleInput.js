define( [], function () {
    return {
        top   : function () { this.handle( /^b$/, "t" ); },
        bottom: function () { this.handle( /^t$/, "b" ); },
        left  : function () { this.handle( /^r$/, "l" ); },
        right : function () { this.handle( /^l$/, "r" ); },
        handle: function ( regex, direction ) {
            if ( !regex.exec( game.vars.direction.previous ) ) {
                game.vars.direction.next = direction;
            }
        },
        turn  : function ( x ) {
            var direction = x < window.innerWidth / 2 ? "left" : "right";
            game.vars.direction.next = this.turns[ direction ][ game.vars.direction.previous ];
        },
        click : function () {
            switch ( game.state.getCurrentState().key ) {
                case  "PreStart":
                    game.state.start( "Game" );
                    break;
                case  "Game":
                    game.state.start( "Score" );
                    break;
                case  "Score":
                    switch ( game.vars.gameType ) {
                        case "classic":
                            game.state.start( "PreStart" );
                            break;
                        case "single":
                            game.state.start( "MenuPlay" );
                            break;
                    }
                    break;
            }
        },
        keys  : function ( keyCode ) {
            switch ( keyCode ) {
                case 37: // ←
                    this.left();
                    break;
                case 38: // ↑
                    this.top();
                    break;
                case 39: // →
                    this.right();
                    break;
                case 40: // ↓
                    this.bottom();
                    break;
                case 13: // Enter
                case 27: // Escape
                case 32: // Space bar
                    this.click();
                    break;
            }
        },
        turns : {
            left : { t: "l", r: "t", b: "r", l: "b" },
            right: { t: "r", r: "b", b: "l", l: "t" }
        }
    };
} );