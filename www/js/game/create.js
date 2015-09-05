define( [ "tools/Map", "tools/changeSize", "segment/Seven" ], function ( Map, changeSize, SevenSegment ) {
    return function () {
        // Group
        var leds = game.add.group();

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

        // Create segments
        game.vars.segments = [];
        for ( var col = 0; col < game.vars.cols; ++col ) {
            game.vars.segments[ col ] = [];
            for ( var row = 0; row < game.vars.rows; ++row ) {
                game.vars.segments[ col ][ row ] = new SevenSegment( leds, col, row );
            }
        }

        // Save LED count for score counting
        game.vars.LEDCount = game.vars.segments.length * game.vars.segments[ 0 ].length * 7;

        // Create map
        game.vars.map = new Map( game.vars.segments );

        // Add snake to map
        game.vars.snake.push( game.vars.map.map[ 0 ][ 0 ].rb );
        game.vars.snake[ game.vars.snake.length - 1 ].setState( SevenSegment.prototype.state.led.snakeHead );

        game.vars.clickAction = "turn";
    };
} );