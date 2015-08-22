function update() {
    if ( ++game.vars.update >= game.vars.speed ) {
        game.vars.update = 0;

        if ( game.vars.direction.next !== "s" && game.vars.state !== "end" ) {
            var point, edge, sideRegex, ledNext,
                index   = game.vars.snake.length - 1,
                ledLast = game.vars.snake[ index ];

            switch ( game.vars.direction.previous ) {
                case "t":
                case "l":
                    edge = "TL";
                    break;
                case "b":
                case "r":
                    edge = "BR";
                    break;
            }
            switch ( game.vars.direction.next ) {
                case "t":
                case "b":
                    sideRegex = /[tb]/g;
                    break;
                case "l":
                case "r":
                    sideRegex = /[rl]/g;
                    break;
            }

            var idLast = ledLast[ edge ].pos,
                idNext = game.vars.direction.next + ledLast[ edge ].pos.replace( sideRegex, "" );

            point = ledLast[ edge ].point;
            ledNext = point[ idNext ];
            game.vars.direction.previous = game.vars.direction.next;

            if (
                ledNext == null
                || ledNext.getState() === LED.prototype.state.snake
                || point.isBlocked( idLast, idNext )
            ) {
                game.vars.snake[ index ].setState( LED.prototype.state.dead );
                game.vars.direction.next = "s";
                game.vars.state = "end";
                game.vars.functions.update = updateScreen;
                game.vars.screen = new ScoreScreen();
            } else {
                if ( ledNext.getState() === LED.prototype.state.food ) {
                    game.vars.snakeLength++;
                    game.vars.food = null;
                }

                // Add new LED to snake
                game.vars.snake.push( ledNext );
                ledNext.setState( LED.prototype.state.snakeHead );
                point.block( idLast, idNext );

                // Set former head LED to snake body
                ledLast.setState( LED.prototype.state.snake );

                index -= game.vars.snakeLength;
                if ( index >= 0 ) {
                    var remove = game.vars.snake[ index ],
                        last   = game.vars.snake[ index + 1 ];

                    // Unblock point if blocked
                    if ( remove.TL.point === last.TL.point || remove.TL.point === last.BR.point ) {
                        remove.TL.point.unblock( remove );
                    } else if ( remove.BR.point === last.TL.point || remove.BR.point === last.BR.point ) {
                        remove.BR.point.unblock( remove );
                    }

                    // Remove last LED from snake
                    for ( var i = 1; i < game.vars.snake.length; ++i ) {
                        game.vars.snake[ i - 1 ] = game.vars.snake[ i ];
                    }
                    game.vars.snake.length--;

                    // Set removed LED to empty
                    remove.setState( LED.prototype.state.empty );
                }
            }
        }

        if ( game.vars.food == null ) {
            // Add food if not present
            var foodLED = game.vars.map.getRandomLED();

            if ( foodLED.getState() === LED.prototype.state.empty ) {
                foodLED.setState( LED.prototype.state.food );
                game.vars.food = foodLED;
            }
        } else if ( Math.random() < 0.01 ) {
            // Randomly remove food
            game.vars.food.setState( LED.prototype.state.empty );
            game.vars.food = null;
        }
    }
}