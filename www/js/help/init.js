define( [], function () {
    var pages = {
        classic    : "In Classic you will proceed to higher levels by eating food (making your snake longer)." +
        "\nBut you can also fall to lower level if you failed to make your snake long enough." +
        "\n\n- Higher levels have bigger maps and faster snakes." +
        "\n- Number right of Classic button in main menu indicates your current level.",
        single     : "In Single level you can freely select map size, speed and many other parameters." +
        "\nYou can also play against computer controlled enemies and/or other player.",
        holesInMap : "This setting (if enabled) places holes (= obstacles) into map." +
        "\nHint: Hitting hole is lethal.",
        multiplayer: "2 snakes for 2 players." +
        "\nControls will be explained at countdown screen.",
        walledMap  : "Sets (invisible) wall around map." +
        "\nIf turned off, you can hit left edge of map and your snake will appear at the right edge." +
        "\nIf turned on, your snake will die upon hitting a map edge.",
        rows       : "Map size. Minimum is 2 and maximum is not limited." +
        "\n\nWARNING: Setting too high value will make game extremely slow and potentially unplayable.",
        enemies    : "Computer controlled 1 LED long cyan enemies. Their amount is not limited." +
        "\nEnemies are aimlessly wandering around map and eating your food. Hitting them is lethal." +
        "\n\nWARNING 1: Setting too many will make game extremely slow and potentially unplayable." +
        "\nWARNING 2: Setting too many can fill up too much space on the map and make game unplayable.",
        speed      : "Number of LEDs your snake will move in 2 seconds. Higher means faster, lower slower." +
        "\nAffects enemies and food too."
    };

    return function ( page, back ) {
        this.game.state.states[ "Help" ].text = pages[ page ] != null ? pages[ page ] : "Help not found, sorry ☹.\nID: " + page;
        this.game.state.states[ "Help" ].back = back;
    };
} );