define( [ "ui/button", "menuPlay/storage", "tools/ordinal" ], function ( button, storage, ordinal ) {
    var rowsLbl, speedLbl, walled, holes,
        click = {
            menu          : function () { game.state.start( "MainMenu" ); },
            classic       : function () {
                game.vars.gameType = "classic";
                game.vars.walledMap = true;
                game.state.start( "Countdown" );
            },
            single        : function () {
                game.vars.gameType = "single";
                game.state.start( "Countdown" );
            },
            rowSub        : function () {
                if ( game.vars.rows > 2 ) {
                    game.vars.rows--;
                    rowsLbl.setText( game.vars.rows );
                }
            },
            rowAdd        : function () {
                game.vars.rows++;
                rowsLbl.setText( game.vars.rows );
            },
            speedSub      : function () {
                if ( game.vars.speed < 60 ) {
                    game.vars.speed += 5;
                    click.speedSetText();
                }
            },
            speedAdd      : function () {
                if ( game.vars.speed > 0 ) {
                    game.vars.speed -= 5;
                    click.speedSetText();
                }
            },
            walledMap     : function () {
                game.vars.walledMap = !game.vars.walledMap;
                click.walledSetColor();
            },
            holesInMap    : function () {
                game.vars.holesInMap = !game.vars.holesInMap;
                click.holesSetColor();
            },
            speedSetText  : function () { speedLbl.setText( click.speedGetText() ); },
            speedGetText  : function () { return (60 - game.vars.speed) / 5; },
            walledSetColor: function () { click.setColor( game.vars.walledMap, walled ); },
            holesSetColor : function () { click.setColor( game.vars.holesInMap, holes ); },
            setColor      : function ( condition, button ) {
                if ( condition ) {
                    button.button.setFrames( 0, 0, 0, 0 );
                    button.label.setText( "✔" );
                } else {
                    button.button.setFrames( 2, 2, 2, 2 );
                    button.label.setText( "✘" );
                }
            }
        };

    return function () {
        var x, y, offset = 288;

        // Load saved values
        storage.load();

        // Menu button
        button( 200, 40, "Menu", click.menu, "button" );


        // Classic
        x = game.world.centerX;
        y = 160;
        button( x, y, "Classic", click.classic, "button" );

        // Level number
        button( x + offset, y - 32, ordinal( game.vars.level.floor() ) + " level", null, "button" );


        // Single
        x = game.world.centerX;
        y = game.world.centerY;
        button( x, y, "Single level", click.single, "button" );

        y += 32;

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

        y += 200;

        // Walled or go through map
        x = game.world.centerX - offset;
        button( x, y, "Walled map", click.walledMap, "button" );
        walled = button( x + 128 + 64 + 4, y, "", click.walledMap, "buttonSquare" );
        click.walledSetColor();

        // Holes in map
        x = game.world.centerX + offset;
        button( x, y, "Holes in map", click.holesInMap, "button" );
        holes = button( x - 128 - 64 - 4, y, "", click.holesInMap, "buttonSquare" );
        click.holesSetColor();
    };
} );