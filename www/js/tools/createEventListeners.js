define( [ "state/game", "tools/handleInput" ], function ( game, handleInput ) {
    return function () {
        // Touch controls
        document.body.addEventListener( 'touchstart', function ( event ) {
            handleInput[ game.vars.clickAction ]( event.targetTouches[ 0 ].pageX, event.targetTouches[ 0 ].pageY );
        }, false );

        // Mouse controls
        document.body.addEventListener( 'mousedown', function ( event ) {
            handleInput[ game.vars.clickAction ]( event.pageX, event.pageY );
        }, false );

        // Keyboard controls
        document.addEventListener( "keydown", function ( event ) {
            handleInput.keys( event.keyCode );
        } );

        //// Touch & click controls. Works only in canvas
        //game.input.onTap.add( function ( event ) {
        //    click( event.positionDown.x, event.positionDown.y );
        //} );
    };
} );