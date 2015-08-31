define( [], function () {
    return function ( position, text, callback ) {
        // Create button group
        var group = game.add.group();

        // Set position
        switch ( typeof position ) {
            case "number":
                group.position.x = game.world.centerX;
                group.position.y = game.world.centerY + 80 + 80 * position;
                break;
            case "object":
                group.position.x = typeof position.x === "number" ? position.x : game.world.centerX;
                group.position.y = typeof position.y === "number" ? position.y : game.world.centerY;
                break;
        }

        // Create button and label
        var button = new Phaser.Button( game, 0, 0, "button", callback, this, 1, 0, 1, 0 ),
            label  = new Phaser.Text( game, 0, 0, text, this.style );

        // Set anchors to center
        button.anchor.setTo( 0.5, 0.5 );
        label.anchor.setTo( 0.5, 0.5 );

        // Add button and label to group
        group.add( button );
        group.add( label );
    };
} );