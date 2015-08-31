var score = {
    save: function ( score ) {
        var scores = this.load();

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
            if ( scores.length < 9 ) {
                scores[ scores.length ] = score;
            }
        } else {
            scores = [ score ];
        }

        // Save updated scores
        localStorage.setItem( "S7_Scores", JSON.stringify( scores ) );
    },
    load: function () {
        return JSON.parse( localStorage.getItem( "S7_Scores" ) );
    }
};