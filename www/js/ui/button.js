define( [ "state/game" ], function ( game ) {
    return function ( x, y, text, callback, asset ) {
        // Create button group
        var group = game.add.group(),
            states;

        // Set position
        group.position.x = x;
        group.position.y = y;

        if ( callback == null ) {
            states = { overFrame: 0, outFrame: 0, downFrame: 0, upFrame: 0 };
        } else {
            states = { overFrame: 1, outFrame: 0, downFrame: 1, upFrame: 0 };
        }

        // Create button and label
        var button = new Phaser.Button(
            game, 0, 0, asset, callback, this,
            states.overFrame, states.outFrame, states.downFrame, states.upFrame
            ),
            label  = new Phaser.Text( game, 0, 0, text, this.style );

        // Set anchors to center
        button.anchor.setTo( 0.5, 0.5 );
        label.anchor.setTo( 0.5, 0.5 );

        // Add button and label to group
        group.add( button );
        group.add( label );

        return { group: group, button: button, label: label };
    };
} );