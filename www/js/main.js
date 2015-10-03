requirejs(
    [ "init/main", "menuMain/main", "menuPlay/main", "highScores/main", "menuSettings/main", "help/main",
        "countdown/main", "game/main", "score/main",
        "tools/Level", "tools/createEventListeners" ],
    function ( init, menuMain, menuPlay, highScores, menuSettings, help,
               countdown, game, score,
               Level, createEventListeners ) {
        // Start Phaser
        window.game = new Phaser.Game( 1200, 720, Phaser.AUTO );

        // Game state and settings
        window.game.vars = {
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
                name: "Arial", size: 12, fill: "#DDDDDD",
                get : function () { return this.size + "px " + this.name; },
                menu: function () { return "24px " + this.name; }
            }
        };

        // Controls
        createEventListeners();

        // Add states
        window.game.state.add( "Init", init );
        window.game.state.add( "MenuMain", menuMain );
        window.game.state.add( "MenuPlay", menuPlay );
        window.game.state.add( "HighScores", highScores );
        window.game.state.add( "MenuSettings", menuSettings );
        window.game.state.add( "Help", help );
        window.game.state.add( "Countdown", countdown );
        window.game.state.add( "Game", game );
        window.game.state.add( "Score", score );

        // Start game
        window.game.state.start( "Init" );
    }
);
