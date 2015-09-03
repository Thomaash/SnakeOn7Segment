define( [], function () {
    return {
        save: function () {
            localStorage.setItem( "So7S_rows", game.vars.rows );
            localStorage.setItem( "So7S_speed", game.vars.speed );
        },
        load: function () {
            var rows = localStorage.getItem( "So7S_rows" ) * 1;
            if ( isNaN( rows ) ) {
                game.vars.speed = 2;
            } else {
                game.vars.speed = rows;
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