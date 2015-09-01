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
    turn  : function ( direction ) {
        switch ( game.vars.state ) {
            case  "end":
            case  "score":
                game.state.start( "PreStart" );
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