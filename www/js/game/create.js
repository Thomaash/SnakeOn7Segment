define(
    [ "state/game", "tools/Map", "tools/changeSize", "segment/Seven", "game/Snake", "game/Enemy" ],
    function ( game, Map, changeSize, SevenSegment, Snake, Enemy ) {
        function deathCallback() {
            game.vars.playersAlive--;

            // If everyone is dead, end the game on click
            if ( game.vars.playersAlive == 0 ) {
                game.vars.clickAction = "click";
            }
        }

        return function () {
            // Set game state
            game.vars.food = null;
            game.vars.playersAlive = 1;
            game.vars.update = 60; // Make first step slow (1 second)

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

            // Whitelist segments
            var whitelist = [], blacklistLength = game.vars.rows, col, row;
            for ( col = 0; col < game.vars.cols; ++col ) {
                whitelist[ col ] = [];
                for ( row = 0; row < game.vars.rows; ++row ) {
                    whitelist[ col ][ row ] = true;
                }
            }
            while ( game.vars.holesInMap && blacklistLength > 0 ) {
                col = Math.floor( Math.random() * game.vars.cols );
                row = Math.floor( Math.random() * game.vars.rows );
                if ( whitelist[ col ][ row ] && !(row === 0 && (col === 0 || col === 1)) ) {
                    blacklistLength--;
                    whitelist[ col ][ row ] = false;
                }
            }

            // Create segments
            game.vars.segments = [];
            for ( col = 0; col < game.vars.cols; ++col ) {
                game.vars.segments[ col ] = [];
                for ( row = 0; row < game.vars.rows; ++row ) {
                    // If enabled, create only 90% of segments, but always keep first and second in fist row
                    if ( whitelist[ col ][ row ] ) {
                        game.vars.segments[ col ][ row ] = new SevenSegment( leds, col, row, scale );
                    } else {
                        // Map always have to be rectangular, create empty spot
                        game.vars.segments[ col ][ row ] = null;
                    }
                }
            }

            // Save LED count for score counting
            game.vars.LEDCount = game.vars.segments.length * game.vars.segments[ 0 ].length * 7;

            // Create map
            game.vars.map = new Map( game.vars.segments, game.vars.walledMap );

            // Create snakes
            game.vars.snakes = [ new Snake( game.vars.map.map[ 0 ][ 0 ].rb, deathCallback, true, false, 0, 0 ) ];
            if ( game.vars.multiplayer ) {
                game.vars.snakes.push( new Snake( game.vars.map.map[ 0 ][ 2 ].rt, deathCallback, true, false, 1, 1 ) );
                game.vars.playersAlive++;
            }

            // Create enemies
            game.vars.enemies = [];
            for ( var i = 0; i < game.vars.enemy; i++ ) {
                game.vars.enemies[ i ] = new Enemy( game.vars.map );
            }

            game.vars.clickAction = "turn";
        };
    }
);