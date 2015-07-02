function createEventListeners() {
    // Keyboard controls
    document.addEventListener( "keydown", function ( event ) {
        switch ( event.keyCode ) {
            case 37: // ←
                handleInput.left();
                break;
            case 38: // ↑
                handleInput.top();
                break;
            case 39: // →
                handleInput.right();
                break;
            case 40: // ↓
                handleInput.bottom();
                break;
            case 80: // P
                handleInput.pause();
                break;
            case 32: // Space bar
                restart();
                break;
            default:
                console.log( event.keyCode );
        }
    } );

    // Touch & click controls
    game.input.onDown.add( function ( event ) {
        click( event.positionDown.x, event.positionDown.y );
    } );
}