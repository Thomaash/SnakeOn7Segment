define( [ "ui/button", "ui/helpButton", "menuPlay/storage" ], function ( button, helpButton, storage ) {
    var rowsLbl, enemyLbl, speedLbl, walled, holes, multiplayer,
        click = {
            menu               : function () {
                game.state.start( "MenuMain" );
            },
            single             : function () {
                game.vars.gameType = "single";
                game.state.start( "Countdown" );
            },
            rowSub             : function () {
                if ( game.vars.rows > 2 ) {
                    rowsLbl.setText( --game.vars.rows );
                }
            },
            rowAdd             : function () {
                rowsLbl.setText( ++game.vars.rows );
            },
            enemySub           : function () {
                if ( game.vars.enemy > 0 ) {
                    enemyLbl.setText( --game.vars.enemy );
                }
            },
            enemyAdd           : function () {
                enemyLbl.setText( ++game.vars.enemy );
            },
            speedSub           : function () {
                if ( game.vars.speed > 1 ) {
                    speedLbl.setText( --game.vars.speed );
                }
            },
            speedAdd           : function () {
                if ( game.vars.speed < 120 ) {
                    speedLbl.setText( ++game.vars.speed );
                }
            },
            walledMap          : function () {
                game.vars.walledMap = !game.vars.walledMap;
                click.walledSetColor();
            },
            holesInMap         : function () {
                game.vars.holesInMap = !game.vars.holesInMap;
                click.holesSetColor();
            },
            multiplayer        : function () {
                game.vars.multiplayer = !game.vars.multiplayer;
                click.multiplayerSetColor();
            },
            walledSetColor     : function () { click.setColor( game.vars.walledMap, walled ); },
            holesSetColor      : function () { click.setColor( game.vars.holesInMap, holes ); },
            multiplayerSetColor: function () { click.setColor( game.vars.multiplayer, multiplayer ); },
            setColor           : function ( condition, button ) {
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
        var x, y, offset = 324;

        // Load saved values
        storage.load();

        // Menu and play buttons
        button( 200, 40, "Menu", click.menu, "button" );
        button( game.world.width - 200, 40, "Play!", click.single, "button" );


        y = 240;

        // Rows
        x = game.world.centerX - offset;
        button( x, y, "Rows", null, "button" );
        button( x - 72, y + 80, "−", click.rowSub, "buttonSquare" );
        rowsLbl = button( x, y + 80, game.vars.rows, null, "buttonSquare" ).label;
        button( x + 72, y + 80, "+", click.rowAdd, "buttonSquare" );

        // Enemy
        x = game.world.centerX;
        button( x, y, "Enemies", null, "button" );
        button( x - 72, y + 80, "−", click.enemySub, "buttonSquare" );
        enemyLbl = button( x, y + 80, game.vars.enemy, null, "buttonSquare" ).label;
        button( x + 72, y + 80, "+", click.enemyAdd, "buttonSquare" );

        // Speed
        x = game.world.centerX + offset;
        button( x, y, "Speed", null, "button" );
        button( x - 72, y + 80, "−", click.speedSub, "buttonSquare" );
        speedLbl = button( x, y + 80, game.vars.speed, null, "buttonSquare" ).label;
        button( x + 72, y + 80, "+", click.speedAdd, "buttonSquare" );


        y += 250;

        // Walled or go through map
        x = game.world.centerX - offset;
        button( x, y, "Walled map", click.walledMap, "button" );
        walled = button( x + 128 + 64 + 4, y, "", click.walledMap, "buttonSquare" );
        click.walledSetColor();

        // Holes in map
        x = game.world.centerX + offset;
        button( x, y, "Holes in map", click.holesInMap, "button" );
        helpButton( x + 128 + 64 + 4, y, "holesInMap" );
        holes = button( x - 128 - 64 - 4, y, "", click.holesInMap, "buttonSquare" );
        click.holesSetColor();


        y += 80;

        // Holes in map
        x = game.world.centerX + offset;
        button( x, y, "Multiplayer", click.multiplayer, "button" );
        multiplayer = button( x - 128 - 64 - 4, y, "", click.multiplayer, "buttonSquare" );
        click.multiplayerSetColor();
    };
} );