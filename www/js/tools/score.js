define( [], function () {
    return {
        save : function ( gameType, score ) {
            var scores = this.load(),
                saveID;

            switch ( gameType ) {
                case "classic":
                    scores = scores.classic;
                    saveID = "So7S_Scores";
                    break;
                case "single":
                    scores = scores.single;
                    saveID = "So7S_ScoresSingle";
                    break;
            }

            if ( scores != null ) {
                // Add score on the right position and move everything behind it
                for ( var i = 0; i < scores.length; i++ ) {
                    if ( scores[ i ] < score ) {
                        var tmp = score;
                        score = scores[ i ];
                        scores[ i ] = tmp;
                    }
                }

                // If score is not full, add new item. Score is the lowest from list and param
                if ( scores.length < 8 ) {
                    scores[ scores.length ] = score;
                }
            } else {
                scores = [ score ];
            }

            // Save updated scores
            localStorage.setItem( saveID, JSON.stringify( scores ) );
        },
        load : function () {
            return {
                classic: JSON.parse( localStorage.getItem( "So7S_Scores" ) ),
                single : JSON.parse( localStorage.getItem( "So7S_ScoresSingle" ) )
            };
        },
        reset: function () {
            localStorage.removeItem( "So7S_Scores" );
            localStorage.removeItem( "So7S_ScoresSingle" );
        }
    };
} );