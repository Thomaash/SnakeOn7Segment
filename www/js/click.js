/**
 *
 * @param {number} x
 * @param {number} y
 */
function click( x, y ) {
    if ( x < game.world.width / 2 ) {
        handleInput.turn( "left" );
    } else {
        handleInput.turn( "right" );
    }
}