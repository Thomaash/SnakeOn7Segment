/**
 *
 * @param {number} x
 * @param {number} y
 */
function click( x, y ) {
    if ( x < window.innerWidth / 2 ) {
        handleInput.turn( "left" );
    } else {
        handleInput.turn( "right" );
    }
}