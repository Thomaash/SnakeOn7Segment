// Start the game when page is loaded
document.addEventListener(
    'DOMContentLoaded',
    function () {
        // Start Phaser
        window.game = new Phaser.Game(
            window.innerWidth, window.innerHeight,
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

        // Game state and settings
        game.vars = {
            snake      : [], // List of LEDs visited by snake
            food       : null, // Food LED
            snakeLength: 0, // 0 means head only, 1 means head + 1 tile, etc.
            segments   : [], // 2D array of LED segments
            scale      : {}, // Scale sprites
            cols       : 3,
            rows       : 1,
            quality    : 160, // Length of LEDs
            direction  : { previous: "r", next: "s" },
            groups     : {},
            state      : "end",
            screen     : {},
            level      : new Level( 1, 1, 1 ), // 1st level, 1 decimal digit, 1 is minimum
            speed      : 40, // Game speed, higher = slower
            map        : null,
            update     : 0,
            countDown  : 0,
            ui         : {
                elements: { leftArrow: null, rightArrow: null, centerScreenText: null },
                font    : {
                    name: "Arial",
                    size: 12,
                    get : function () {return this.size + "px " + this.name;}
                }
            },
            functions  : { update: startGame }
        };
    },
    false
);