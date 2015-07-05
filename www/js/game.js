// Start the game when page is loaded
document.addEventListener(
    'DOMContentLoaded',
    function () {
        var cols = 6, rows = 2;

        window.game = new Phaser.Game(
            cols * (SevenSegment.prototype.width + SevenSegment.prototype.margin),
            rows * (SevenSegment.prototype.height + SevenSegment.prototype.margin),
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

        game.vars = {
            snake      : [], // List of LEDs visited by snake
            food       : null, // Food LED
            snakeLength: 0, // 0 means head only, 1 means head + 1 tile, etc.
            segments   : [], // 2D array of LED segments
            cols       : cols,
            rows       : rows,
            direction  : { previous: "r", next: "s" },
            state      : "end",
            map        : null,
            update     : 0,
            countDown  : 0,
            ui         : { arrow: { l: null, r: null } },
            functions  : { update: update }
        };
    },
    false
);