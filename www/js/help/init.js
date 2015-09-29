define( [], function () {
    var pages = {
        classic   : "There will be help for classic",
        single    : "There will be help for single level",
        holesInMap: "There will be help for holes in map"
    };

    return function ( page, back ) {
        this.game.state.states[ "Help" ].text = pages[ page ] != null ? pages[ page ] : "Help not found, sorry ☹.\nID: " + page;
        this.game.state.states[ "Help" ].back = back;
    };
} );