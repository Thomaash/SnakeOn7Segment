define( [], function () {
    return function ( number ) {
        switch ( String( number ).slice( -1 ) ) {
            case "1":
                return number + "st";
            case "2":
                return number + "nd";
            case "3":
                return number + "rd";
            default:
                return number + "th";
        }
    };
} );