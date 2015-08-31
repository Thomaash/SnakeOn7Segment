function createEventListeners() {
    // Touch controls
    document.body.addEventListener( 'touchstart', function ( event ) {
        click( event.targetTouches[ 0 ].pageX, event.targetTouches[ 0 ].pageY );
    }, false );

    // Mouse controls
    document.body.addEventListener( 'mousedown', function ( event ) {
        click( event.pageX, event.pageY );
    }, false );

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
                switch ( game.vars.state ) {
                    case  "end":
                        game.state.start( "Game" );
                        break;
                    case  "prepared":
                        restart();
                        break;
                }
                break;
        }
    } );

    //// Touch & click controls. Works only in canvas
    //game.input.onTap.add( function ( event ) {
    //    click( event.positionDown.x, event.positionDown.y );
    //} );
}