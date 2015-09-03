define( [], function () {
    return {
        save: function () {
            localStorage.setItem( "So7S_rows", game.vars.rows );
            localStorage.setItem( "So7S_speed", game.vars.speed );
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
        }
    };
} );