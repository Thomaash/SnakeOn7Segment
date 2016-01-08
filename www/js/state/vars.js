define( [], function () {
    return {
        gameType    : "classic",
        walledMap   : true,
        holesInMap  : true,
        enemy       : false,
        multiplayer : true,
        playersAlive: 0,
        food        : null, // Food LED
        snakes      : [],
        enemies     : [],
        scores      : [],
        segments    : [], // 1D or 2D array of LED segments
        LEDCount    : 0,
        rows        : 2,
        cols        : 6,
        quality     : 160, // Length of LEDs
        clickAction : "click",
        level       : new Level( 1, 1, 1 ), // 1st level, 1 decimal digit, 1 is minimum
        speed       : 40, // Game speed, higher = slower
        map         : null,
        update      : 0,
        countDown   : 0,
        font        : {
            name  : "Arial", size: 12, fill: "#DDDDDD",
            get   : function () { return this.size + "px " + this.name; },
            menu  : function () { return "24px " + this.name; },
            footer: function () { return "16px " + this.name; }
        }
    };
} );