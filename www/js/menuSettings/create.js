define( [ "ui/button", "ui/helpButton", "menuPlay/storage" ], function ( button, helpButton, storage ) {
    var help,
        click = {
            menu        : function () {
                game.state.start( "MenuMain" );
            },
            help        : function () {
                game.vars.help = !game.vars.help;
                click.helpSetColor();
            },
            helpSetColor: function () { click.setColor( game.vars.help, help ); },
            setColor    : function ( condition, button ) {
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

        // Menu button
        button( 200, 40, "Menu", click.menu, "button" );


        y = 240;

        // Help
        x = game.world.centerX - offset;
        button( x, y, "Show help", click.help, "button" );
        help = button( x + 196, y, "", click.help, "buttonSquare" );
        click.helpSetColor();
    };
} );