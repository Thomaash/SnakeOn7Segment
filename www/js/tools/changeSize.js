define( [], function () {
    return function ( game, width, height ) {
        width = typeof width === "number" ? width : 1200;
        height = typeof height === "number" ? height : 720;

        game.width = width;
        game.height = height;
        game.stage.getBounds.width = width;
        game.stage.getBounds.height = height;
        game.world.setBounds( 0, 0, width, height );
        game.camera.setSize( width, height );
        game.camera.setBoundsToWorld();
        game.renderer.resize( width, height );
    };
} );