define( [], function () {
    function clickPlay() {
        // Start game
        game.state.start( "Game" );
    }

    function createButton( position, text, callback ) {// Create button group
        var group = game.add.group();
        group.position.x = game.world.centerX;
        // First button is 80px below center, every next is 80px below previous
        group.position.y = game.world.centerY + 80 + 80 * position;

        // Create button and label
        var button = new Phaser.Button( game, 0, 0, "button", callback, this, 1, 0, 1, 0 ),
            label  = new Phaser.Text( game, 0, 0, text, this.style );

        // Set anchors to center
        button.anchor.setTo( 0.5, 0.5 );
        label.anchor.setTo( 0.5, 0.5 );

        // Add button and label to group
        group.add( button );
        group.add( label );
    }

    return function () {
        var header = game.add.sprite( game.world.centerX, 0, "header" );
        header.anchor.setTo( 0.5, 0 );

        createButton( 0, "Play", clickPlay );
    };
} );