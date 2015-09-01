function createEventListeners() {
    // Touch controls
    document.body.addEventListener( 'touchstart', function ( event ) {
        handleInput[ game.vars.clickAction ]( event.targetTouches[ 0 ].pageX );
    }, false );

    // Mouse controls
    document.body.addEventListener( 'mousedown', function ( event ) {
        handleInput[ game.vars.clickAction ]( event.pageX );
    }, false );

    // Keyboard controls
    document.addEventListener( "keydown", function ( event ) {
        handleInput.keys( event.keyCode );
    } );

    //// Touch & click controls. Works only in canvas
    //game.input.onTap.add( function ( event ) {
    //    click( event.positionDown.x, event.positionDown.y );
    //} );
}