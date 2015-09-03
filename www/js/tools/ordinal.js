define( [], function () {
    return function ( number ) {
        number = String( number );

        if ( /1\d$/.exec( number ) ) {
            return number + "th";
        } else if ( /1$/.exec( number ) ) {
            return number + "st";
        } else if ( /2$/.exec( number ) ) {
            return number + "nd";
        } else if ( /3$/.exec( number ) ) {
            return number + "rd";
        } else {
            return number + "th";
        }
    };
} );