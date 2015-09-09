define( [ "ui/button" ], function ( button ) {
    var click = {
        classic: function () {
            game.vars.gameType = "classic";
            game.vars.walledMap = true;
            game.vars.holesInMap = false;
            game.vars.enemy = false;
            game.vars.multiplayer = false;
            game.state.start( "Countdown" );
        },
        single : function () { game.state.start( "MenuPlay" ); },
        scores : function () { game.state.start( "HighScores" ); }
    };

    return function () {
        var header = game.add.sprite( game.world.centerX, 0, "header" ),
            x      = game.world.centerX,
            y      = game.world.centerY;
        header.anchor.setTo( 0.5, 0 );

        y += 80;
        button( x, y, "Play Classic", click.classic, "button" );
        button( x + 200, y, game.vars.level.floor(), click.classic, "buttonSquare" );

        y += 80;
        button( x, y, "Play single level", click.single, "button" );

        y += 80;
        button( x, y, "High scores", click.scores, "button" );
    };
} );