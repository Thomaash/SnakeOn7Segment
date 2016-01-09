requirejs.config( {
    baseUrl: "js",
    paths  : {
        Phaser: "/lib/phaser"
    }
} );

requirejs(
    [ "state/game",
        "init/main", "menuMain/main", "menuPlay/main", "highScores/main", "menuSettings/main", "help/main",
        "countdown/main", "game/main", "score/main",
        "tools/createEventListeners", "tools/storage" ],
    function ( game,
               stateInit, stateMenuMain, stateMenuPlay, stateHighScores, stateMenuSettings, stateHelp,
               stateCountdown, stateGame, stateScore,
               createEventListeners, storage ) {
        // Controls
        createEventListeners();

        // Add states
        game.state.add( "Init", stateInit );
        game.state.add( "MenuMain", stateMenuMain );
        game.state.add( "MenuPlay", stateMenuPlay );
        game.state.add( "HighScores", stateHighScores );
        game.state.add( "MenuSettings", stateMenuSettings );
        game.state.add( "Help", stateHelp );
        game.state.add( "Countdown", stateCountdown );
        game.state.add( "Game", stateGame );
        game.state.add( "Score", stateScore );

        // Load settings
        storage.load( "help" );

        // Start game
        game.state.start( "Init" );
    }
);
