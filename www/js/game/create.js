define( [ "tools/Map", "tools/changeSize", "segment/Seven" ], function ( Map, changeSize, SevenSegment ) {
    return function () {
        // Group
        game.vars.groups.leds = game.add.group();
        game.vars.groups.ui = game.add.group();

        // Count LED scale
        game.vars.scale.leds = game.vars.quality / 160;

        // Count and set canvas dimensions
        var width  = game.vars.cols
                * (SevenSegment.prototype.width + SevenSegment.prototype.margin)
                * game.vars.scale.leds,
            height = game.vars.rows
                * (SevenSegment.prototype.height + SevenSegment.prototype.margin)
                * game.vars.scale.leds;
        changeSize( game, width, height );

        // Help UI text
        var centerScreenText = new Phaser.Text(
            game,
            game.world.centerX, game.world.height / 3,
            "Tap anywhere to start",
            { font: game.vars.ui.font.get(), fill: "#ddd", align: "center" }
        );
        game.vars.groups.ui.add( centerScreenText );
        centerScreenText.anchor.set( 0.5, 0.5 );
        centerScreenText.wordWrap = true;
        centerScreenText.wordWrapWidth = game.world.width - 50;
        centerScreenText.visible = false;

        // Create segments
        game.vars.segments = [];
        for ( var col = 0; col < game.vars.cols; ++col ) {
            game.vars.segments[ col ] = [];
            for ( var row = 0; row < game.vars.rows; ++row ) {
                game.vars.segments[ col ][ row ] = new SevenSegment( col, row );
            }
        }

        // Save LED count for score counting
        game.vars.LEDCount = game.vars.segments.length * game.vars.segments[ 0 ].length * 7;

        // Create map
        game.vars.map = new Map();

        // Add snake to map
        game.vars.snake.push( game.vars.map.map[ 0 ][ 0 ].rb );
        game.vars.snake[ game.vars.snake.length - 1 ].setState( SevenSegment.prototype.state.led.snakeHead );

        game.vars.clickAction = "turn";
    };
} );