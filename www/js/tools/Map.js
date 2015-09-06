define( [ "tools/Point" ], function ( Point ) {
    function Map( segments, mapType ) {
        this.map = [];
        this.segments = segments;

        // There is 1 col of points between LEDs in 1 segment + one at the end
        // There are 2 rows of points between LEDs in 1 segment + one at the end
        // Map is always rectangular and there is 1 more iteration than the number of cols, so segments[0]
        var cols = segments.length, rows = segments[ 0 ].length * 2;

        // Set up map variant
        var connectPoint;
        if ( mapType ) {
            connectPoint = this.walledMap.bind( this );
        } else {
            connectPoint = this.goThroughMap.bind( this );
        }

        for ( var col = 0; col <= cols; ++col ) {
            this.map[ col ] = [];

            for ( var row = 0; row <= rows; row++ ) {
                connectPoint( col, row, cols, rows );
            }
        }
    }

    Map.prototype.walledMap = function ( col, row ) {
        var rowsHalf = Math.floor( row / 2 ),
            x        = col,
            xm       = col - 1,
            y        = rowsHalf,
            ym       = rowsHalf - 1;

        if ( row % 2 === 0 ) {
            this.map[ col ][ row ] = this.connectSegmentsTop(
                this.getSegment( xm, ym ),
                this.getSegment( x, ym ),
                this.getSegment( x, y ),
                this.getSegment( xm, y )
            );
        } else {
            this.map[ col ][ row ] = this.connectSegmentsMiddle(
                this.getSegment( xm, y ),
                this.getSegment( x, y )
            );
        }
    };
    Map.prototype.goThroughMap = function ( col, row, cols, rows ) {
        var rowsHalf = Math.floor( row / 2 ),
            x        = col === cols ? 0 : col,
            xm       = col - 1 < 0 ? cols : col - 1,
            y        = row === rows ? 0 : rowsHalf,
            ym       = rowsHalf - 1 < 0 ? Math.floor( rows / 2 ) : rowsHalf - 1;

        if ( row % 2 === 0 ) {
            this.map[ col ][ row ] = this.connectSegmentsTop(
                this.getSegment( xm, ym ),
                this.getSegment( x, ym ),
                this.getSegment( x, y ),
                this.getSegment( xm, y )
            );
        } else {
            this.map[ col ][ row ] = this.connectSegmentsMiddle(
                this.getSegment( xm, y ),
                this.getSegment( x, y )
            );
        }
    };
    Map.prototype.connectSegmentsTop = function ( stl, str, sbr, sbl ) {
        var tl, tr, rt, rb, br, bl, lb, lt;
        if ( stl != null ) {
            tl = stl.leds[ 2 ];
            lt = stl.leds[ 3 ];
        }
        if ( str != null ) {
            tr = str.leds[ 4 ];
            rt = str.leds[ 3 ];
        }
        if ( sbr != null ) {
            br = sbr.leds[ 5 ];
            rb = sbr.leds[ 0 ];
        }
        if ( sbl != null ) {
            bl = sbl.leds[ 1 ];
            lb = sbl.leds[ 0 ];
        }

        return new Point( tl, tr, rt, rb, br, bl, lb, lt );
    };
    Map.prototype.connectSegmentsMiddle = function ( sl, sr ) {
        var tl, tr, rt, rb, br, bl, lb, lt;
        if ( sl != null ) {
            tl = sl.leds[ 1 ];
            lt = sl.leds[ 6 ];
            lb = sl.leds[ 6 ];
            bl = sl.leds[ 2 ];
        }
        if ( sr != null ) {
            tr = sr.leds[ 5 ];
            rt = sr.leds[ 6 ];
            rb = sr.leds[ 6 ];
            br = sr.leds[ 4 ];
        }

        return new Point( tl, tr, rt, rb, br, bl, lb, lt );
    };
    Map.prototype.getSegment = function ( col, row ) {
        if ( this.segments[ col ] && this.segments[ col ][ row ] ) {
            return this.segments[ col ][ row ];
        } else {
            return null;
        }
    };
    Map.prototype.getRandomSegment = function () {
        var segment = null;

        while ( segment == null ) {
            var col = Math.floor( this.segments.length * Math.random() ),
                row = Math.floor( this.segments[ col ].length * Math.random() );

            segment = this.segments[ col ][ row ];
        }

        return segment;
    };
    Map.prototype.getRandomLED = function () {
        var segment = this.getRandomSegment();

        return segment.getRandomLED();
    };
    Map.prototype.clearBlocking = function () {
        for ( var row = 0; row < this.map.length; ++row ) {
            for ( var col = 0; col < this.map[ row ].length; ++col ) {
                this.map[ row ][ col ].clearBlocking();
            }
        }
    };
    Map.prototype.setPointState = function ( x, y, color ) {
        if ( x < this.map.length && y < this.map[ x ].length ) {
            var point = this.map[ x ][ y ];

            for ( var key in point ) {
                if ( point.hasOwnProperty( key ) && point[ key ] != null ) {
                    point[ key ].setState( color );
                }
            }
        }
    };

    return Map;
} );