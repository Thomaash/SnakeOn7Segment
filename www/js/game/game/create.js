define( [], function () {
    return function () {
        // Groups
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

        // Help UI arrows
        var x = game.world.width, y = game.world.height / 2;
        game.vars.ui.elements.leftArrow = game.vars.groups.ui.create( x * 0.1, y, "Arrows", 0 );
        game.vars.ui.elements.rightArrow = game.vars.groups.ui.create( x * 0.9, y, "Arrows", 1 );
        game.vars.ui.elements.leftArrow.scale.x = game.vars.scale.ui;
        game.vars.ui.elements.leftArrow.scale.y = game.vars.scale.ui;
        game.vars.ui.elements.rightArrow.scale.x = game.vars.scale.ui;
        game.vars.ui.elements.rightArrow.scale.y = game.vars.scale.ui;
        game.vars.ui.elements.leftArrow.anchor.setTo( 0.5, 0.5 );
        game.vars.ui.elements.rightArrow.anchor.setTo( 0.5, 0.5 );

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

        game.vars.state = "prepared";
    };
} );