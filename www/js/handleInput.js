var handleInput = {
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
            case  "Game":
                game.state.start( "Score" );
                break;
            case  "Score":
                game.state.start( "PreStart" );
                break;
        }
    },
    keys  : function ( keyCode ) {
        switch ( keyCode ) {
            case 37: // ←
                handleInput.left();
                break;
            case 38: // ↑
                handleInput.top();
                break;
            case 39: // →
                handleInput.right();
                break;
            case 40: // ↓
                handleInput.bottom();
                break;
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