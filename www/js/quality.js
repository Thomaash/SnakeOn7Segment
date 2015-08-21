function quality( cols, rows ) {
    var size    = {
            width : window.innerWidth / cols / SevenSegment.prototype.width,
            height: window.innerHeight / rows / SevenSegment.prototype.height
        },
        quality = {
            high  : 0.875,
            medium: 0.625,
            low   : 0.375
        };

    if ( size.width > quality.high && size.height > quality.high ) {
        return 160;
    } else if ( size.width > quality.medium && size.height > quality.medium ) {
        return 120;
    } else if ( size.width > quality.low && size.height > quality.low ) {
        return 80;
    } else {
        return 40;
    }
}