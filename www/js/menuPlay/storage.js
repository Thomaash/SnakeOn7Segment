define( [], function () {
    return {
        save: function () {
            localStorage.setItem( "So7S_rows", game.vars.rows );
            localStorage.setItem( "So7S_speed", game.vars.speed );
            localStorage.setItem( "So7S_walled", game.vars.walledMap );
        },
        load: function () {
            var rows = parseInt( localStorage.getItem( "So7S_rows" ) );
            if ( isNaN( rows ) ) {
                game.vars.rows = 2;
            } else {
                game.vars.rows = rows;
            }

            var speed = parseInt( localStorage.getItem( "So7S_speed" ) );
            if ( isNaN( speed ) ) {
                game.vars.speed = 40;
            } else {
                game.vars.speed = speed;
            }

            var walled = localStorage.getItem( "So7S_walled" );
            if ( walled == null ) {
                game.vars.walledMap = true;
            } else {
                game.vars.walledMap = walled === "true";
            }
        }
    };
} );