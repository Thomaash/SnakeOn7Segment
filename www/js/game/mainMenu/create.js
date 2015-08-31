define( [], function () {
    function clickPlay() {
        // Start game
        game.state.start( "Game" );
    }

    return function () {
        // Create button group
        var group = game.add.group();
        group.position.x = game.world.centerX;
        group.position.y = game.world.centerY;

        // Create button and label
        var button = new Phaser.Button( game, 0, 0, "button", clickPlay, this, 1, 0, 2 ),
            label  = new Phaser.Text( game, 0, 0, "Play", this.style );

        // Set anchors to center
        button.anchor.setTo( 0.5, 0.5 );
        label.anchor.setTo( 0.5, 0.5 );

        // Add button and label to group
        group.add( button );
        group.add( label );
    };
} );