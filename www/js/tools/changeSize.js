define( [], function () {
    return function ( game, width, height ) {
        width = typeof width === "number" ? width : 1200;
        height = typeof height === "number" ? height : 720;

        game.world.width = width; // Resize world
        game.world.height = height; // Resize world
        game.scale.setGameSize( width, height ); // Tell Phaser to resize canvas
        game.renderer.resize( width, height ); // Tell renderer to resize canvas
        game.scale.refresh(); // Tell scale manager to scale to new canvas size
    };
} );