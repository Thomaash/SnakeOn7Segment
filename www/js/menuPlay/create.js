define( [ "ui/button", "menuPlay/storage" ], function ( button, storage ) {
    var rowsLbl, speedLbl,
        click = {
            menu        : function () { game.state.start( "MainMenu" ); },
            play        : function () {
                game.vars.gameType = "classic";
                game.state.start( "Countdown" );
            },
            single      : function () {
                game.vars.gameType = "single";
                game.state.start( "Countdown" );
            },
            rowSub      : function () {
                if ( game.vars.rows > 2 ) {
                    game.vars.rows--;
                    rowsLbl.setText( game.vars.rows );
                }
            },
            rowAdd      : function () {
                game.vars.rows++;
                rowsLbl.setText( game.vars.rows );
            },
            speedSub    : function () {
                if ( game.vars.speed < 60 ) {
                    game.vars.speed += 5;
                    click.speedSetText();
                }
            },
            speedAdd    : function () {
                if ( game.vars.speed > 0 ) {
                    game.vars.speed -= 5;
                    click.speedSetText();
                }
            },
            speedSetText: function () { speedLbl.setText( click.speedGetText() ); },
            speedGetText: function () { return (60 - game.vars.speed) / 5; }
        };

    return function () {
        var x, y, offset = 288;

        // Load saved values
        storage.load();

        // Menu button
        button( 200, 40, "Menu", click.menu, "button" );

        y = game.world.centerY + 32;

        // Rows
        x = game.world.centerX - offset;
        button( x, y, "Rows", null, "button" );
        button( x - 72, y + 80, "−", click.rowSub, "buttonSquare" );
        rowsLbl = button( x, y + 80, game.vars.rows, null, "buttonSquare" ).label;
        button( x + 72, y + 80, "+", click.rowAdd, "buttonSquare" );

        // Speed
        x = game.world.centerX + offset;
        button( x, y, "Speed", null, "button" );
        button( x - 72, y + 80, "−", click.speedSub, "buttonSquare" );
        speedLbl = button( x, y + 80, click.speedGetText(), null, "buttonSquare" ).label;
        button( x + 72, y + 80, "+", click.speedAdd, "buttonSquare" );

        // Game type buttons
        button( game.world.centerX, game.world.centerY - 160, "Classic", click.play, "button" );
        button( game.world.centerX, game.world.centerY, "Single level", click.single, "button" );
    };
} );