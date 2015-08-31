var handleInput = {
    top   : function () {
        this.handle( /^b$/, "t" );
    },
    bottom: function () {
        this.handle( /^t$/, "b" );
    },
    left  : function () {
        this.handle( /^r$/, "l" );
    },
    right : function () {
        this.handle( /^l$/, "r" );
    },
    handle: function ( regex, direction ) {
        if ( !regex.exec( game.vars.direction.previous ) && game.vars.state !== "end" ) {
            game.vars.direction.next = direction;
        }
    },
    pause : function () {
        if ( game.vars.state === "pause" ) {
            game.vars.state = "run";
        } else {
            game.vars.state = "pause";
        }
    },
    turn  : function ( direction ) {
        switch ( game.vars.state ) {
            case  "end":
                game.state.start( "Game" );
                break;
            case  "prepared":
                restart();
                break;
            default:
                game.vars.direction.next = this.turns[ direction ][ game.vars.direction.previous ];
        }
    },
    turns : {
        left : { t: "l", r: "t", b: "r", l: "b" },
        right: { t: "r", r: "b", b: "l", l: "t" }
    }
};