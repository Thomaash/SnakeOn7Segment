define( [ "state/game", "game/Snake", "Phaser" ], function ( game, Snake, Phaser ) {
    /**
     * Moves Snake object randomly on move()
     *
     * @param {Map} map The map to place it's Snake in
     */
    function Enemy( map ) {
        var led = null;
        while ( led == null || led.getState() !== led.states.empty ) {
            led = map.getRandomLED();
        }

        this.snake = new Snake( led, null, false, true, led.states.enemy, led.states.enemy );
    }

    Enemy.prototype = {
        choices: [ "left", null, null, null, null, "right" ], // ⅙ turn left, ⅙ turn right, ⅔ contiue straight ahead
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
