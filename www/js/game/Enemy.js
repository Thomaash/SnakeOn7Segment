define( [ "state/game", "game/Snake", "Phaser" ], function ( game, Snake, Phaser ) {
    function Enemy( map ) {
        var led = null;
        while ( led == null || led.getState() !== led.states.empty ) {
            led = map.getRandomLED();
        }

        this.snake = new Snake( led, null, false, true, led.states.enemy, led.states.enemy );
    }

    Enemy.prototype = {
        choices: [ "left", null, null, null, null, "right" ],
        rdg    : new Phaser.RandomDataGenerator(),
        move   : function () {
            var turn = this.rdg.pick( this.choices );

            if ( turn != null ) {
                this.snake.turn( turn );
            }

            this.snake.move(); // Move head to new position
            this.snake.changeLeds(); // Clear tail LED
        }
    };

    return Enemy;
} );