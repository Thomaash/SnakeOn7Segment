define( [], function () {
    return function ( game, width, height ) {
        width = typeof width === "number" ? width : 1280;
        height = typeof height === "number" ? height : 720;

        game.width = width;
        game.height = height;
        game.world.width = width;
        game.world.height = height;
        game.renderer.resize( width, height ); // Tell renderer to resize canvas
        game.scale.refresh(); // Tell scale manager to scale to new canvas size
    };
} );