define( [ "segment/Seven" ], function ( SevenSegment ) {
    return function () {
        if ( ++game.vars.update >= game.vars.speed ) {
            game.vars.update = 0;

            if ( game.vars.clickAction === "turn" ) {
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
                    || ledNext.getState() === SevenSegment.prototype.state.led.snake
                    || point.isBlocked( idLast, idNext )
                ) {
                    game.vars.snake[ index ].setState( SevenSegment.prototype.state.led.dead );
                    game.vars.direction.next = "s";
                    game.vars.clickAction = "click";
                    game.vars.speed = 120;
                } else {
                    if ( ledNext.getState() === SevenSegment.prototype.state.led.food ) {
                        game.vars.snakeLength++;
                        game.vars.food = null;
                    }

                    // Add new LED to snake
                    game.vars.snake.push( ledNext );
                    ledNext.setState( SevenSegment.prototype.state.led.snakeHead );
                    point.block( idLast, idNext );

                    // Set former head LED to snake body
                    ledLast.setState( SevenSegment.prototype.state.led.snake );

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
                        remove.setState( SevenSegment.prototype.state.led.empty );
                    }
                }

                if ( game.vars.food == null ) {
                    // Add food if not present
                    var foodLED = game.vars.map.getRandomLED();

                    if ( foodLED.getState() === SevenSegment.prototype.state.led.empty ) {
                        foodLED.setState( SevenSegment.prototype.state.led.food );
                        foodLED.life = 2 * (game.vars.rows + game.vars.cols);
                        game.vars.food = foodLED;
                    }
                } else {
                    // Randomly remove food
                    game.vars.food.life -= Math.random();

                    if ( game.vars.food.life < 0 ) {
                        game.vars.food.setState( SevenSegment.prototype.state.led.empty );
                        game.vars.food = null;
                    }
                }
            } else {
                game.state.start( "Score" );
            }
        }
    };
} );