define(
    [ "tools/Map", "tools/changeSize", "segment/Seven", "game/Snake", "game/Enemy" ],
    function ( Map, changeSize, SevenSegment, Snake, Enemy ) {
        return function () {
            // Set game state
            game.vars.food = null;
            game.vars.playersAlive = 1;
            game.vars.update = 0;

            // Group
            var leds = game.add.group();

            // Count LED scale
            var scale = game.vars.quality / 160;

            // Count and set canvas dimensions
            var width  = game.vars.cols
                    * (SevenSegment.prototype.width + SevenSegment.prototype.margin)
                    * scale,
                height = game.vars.rows
                    * (SevenSegment.prototype.height + SevenSegment.prototype.margin)
                    * scale;
            changeSize( game, width, height );

            // Create segments
            game.vars.segments = [];
            for ( var col = 0; col < game.vars.cols; ++col ) {
                game.vars.segments[ col ] = [];
                for ( var row = 0; row < game.vars.rows; ++row ) {
                    // If enabled, create only 90% of segments, but always keep first and second in fist row
                    if ( !game.vars.holesInMap || Math.random() < 0.9 || (row === 0 && (col === 0 || col === 1)) ) {
                        game.vars.segments[ col ][ row ] = new SevenSegment( leds, col, row, scale );
                    }
                }
            }

            // Save LED count for score counting
            game.vars.LEDCount = game.vars.segments.length * game.vars.segments[ 0 ].length * 7;

            // Create map
            game.vars.map = new Map( game.vars.segments, game.vars.walledMap );

            // Create snakes
            game.vars.snakes = [];
            game.vars.snakes.push( new Snake( game.vars.map.map[ 0 ][ 0 ].rb ) );
            if ( game.vars.multiplayer ) {
                game.vars.snakes.push( new Snake( game.vars.map.map[ 0 ][ 2 ].rt ) );
                game.vars.playersAlive++;
            }

            // Create enemies
            game.vars.enemies = [];
            if ( game.vars.enemy ) {
                game.vars.enemies.push( new Enemy( game.vars.map ) );
            }

            game.vars.clickAction = "turn";
        };
    }
);