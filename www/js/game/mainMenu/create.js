define( ["ui/createButton"], function (createButton) {
    function clickPlay() {
        game.state.start( "PreStart" );
    }

    function clickHigh() {
        game.state.start( "HighScores" );
    }

    return function () {
        var header = game.add.sprite( game.world.centerX, 0, "header" );
        header.anchor.setTo( 0.5, 0 );

        createButton( 0, "Play", clickPlay );
        createButton( 1, "Highscores", clickHigh );
    };
} );