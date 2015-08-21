// Start the game when page is loaded
document.addEventListener(
    'DOMContentLoaded',
    function () {
        var rows = Math.round( Math.random() * 3 + 2 ),
            cols = 3 * rows;

        // Game state and settings
        var vars = {
            snake      : [], // List of LEDs visited by snake
            food       : null, // Food LED
            snakeLength: 0, // 0 means head only, 1 means head + 1 tile, etc.
            segments   : [], // 2D array of LED segments
            scale      : {}, // Scale sprites
            cols       : cols,
            rows       : rows,
            quality    : quality( cols, rows ), // Length of LEDs
            direction  : { previous: "r", next: "s" },
            state      : "end",
            map        : null,
            update     : 0,
            countDown  : 0,
            ui         : {
                elements: { leftArrow: null, rightArrow: null, centerScreenText: null },
                font    : "px Arial"
            },
            functions  : { update: update }
        };

        // Count LED scale
        vars.scale.leds = vars.quality / 160;

        // Count canvas dimensions
        var width  = vars.cols * (SevenSegment.prototype.width + SevenSegment.prototype.margin) * vars.scale.leds,
            height = vars.rows * (SevenSegment.prototype.height + SevenSegment.prototype.margin) * vars.scale.leds;

        // Count IU scale
        vars.scale.ui = height / 720;

        // Set font size
        vars.ui.font = Math.round( height / 12 ) + vars.ui.font;

        // Start Phaser
        window.game = new Phaser.Game(
            width, height,
            Phaser.AUTO,
            'Snake On 7-Segment',
            {
                create : create,
                preload: preload,
                //render : render,
                update : function () {
                    game.vars.functions.update();
                }
            }
        );

        game.vars = vars;
    },
    false
);