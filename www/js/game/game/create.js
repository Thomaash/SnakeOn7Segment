define( [], function () {
    return function () {
        // Group
        game.vars.groups.leds = game.add.group();
        game.vars.groups.ui = game.add.group();

        // Prevent function from being called two times
        game.vars.functions.update = function () {};

        // Count LED scale
        game.vars.scale.leds = game.vars.quality / 160;

        // Count and set canvas dimensions
        var width  = game.vars.cols
                * (SevenSegment.prototype.width + SevenSegment.prototype.margin)
                * game.vars.scale.leds,
            height = game.vars.rows
                * (SevenSegment.prototype.height + SevenSegment.prototype.margin)
                * game.vars.scale.leds;
        game.width = width;
        game.height = height;
        game.world.width = width;
        game.world.height = height;
        game.renderer.resize( width, height ); // Tell renderer to resize canvas
        game.scale.refresh(); // Tell scale manager to scale to new canvas size

        // Help UI text
        game.vars.ui.elements.centerScreenText = new Phaser.Text(
            game,
            game.world.centerX, game.world.height / 3,
            "Tap anywhere to start",
            { font: game.vars.ui.font.get(), fill: "#ddd", align: "center" }
        );
        game.vars.groups.ui.add( game.vars.ui.elements.centerScreenText );
        game.vars.ui.elements.centerScreenText.anchor.set( 0.5, 0.5 );
        game.vars.ui.elements.centerScreenText.wordWrap = true;
        game.vars.ui.elements.centerScreenText.wordWrapWidth = game.world.width - 50;
        game.vars.ui.elements.centerScreenText.visible = false;

        // Create segments
        game.vars.segments = [];
        for ( var col = 0; col < game.vars.cols; ++col ) {
            game.vars.segments[ col ] = [];
            for ( var row = 0; row < game.vars.rows; ++row ) {
                game.vars.segments[ col ][ row ] = new SevenSegment( col, row );
            }
        }

        // Create map
        game.vars.map = new Map();

        // Add snake to map
        game.vars.snake.push( game.vars.map.map[ 0 ][ 0 ].rb );
        game.vars.snake[ game.vars.snake.length - 1 ].setState( LED.prototype.state.snakeHead );

        // Set game speed, 40 for 1st level, 10 minimum
        game.vars.speed = 50 - game.vars.level.floor() * 5;
        if ( game.vars.speed < 10 ) {
            game.vars.speed = 10;
        }

        game.vars.functions.update = update;
        game.vars.state = "run";
    };
} );