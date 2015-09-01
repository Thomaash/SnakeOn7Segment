define( [ "tools/Point" ], function ( Point ) {
    function Map() {
        this.map = [];

        for ( var col = 0; col <= game.vars.cols; ++col ) {
            this.map.push( [] );
            for ( var row = 0; row <= game.vars.rows * 2; row++ ) {
                var x = col, y = Math.floor( row / 2 );

                if ( row % 2 === 0 ) {
                    this.map[ col ][ row ] = this.connectSegmentsTop(
                        this.getSegment( x - 1, y - 1 ),
                        this.getSegment( x, y - 1 ),
                        this.getSegment( x, y ),
                        this.getSegment( x - 1, y )
                    );
                } else {
                    this.map[ col ][ row ] = this.connectSegmentsMiddle(
                        this.getSegment( x - 1, y ),
                        this.getSegment( x, y )
                    );
                }
            }
        }
    }

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
        if ( game.vars.segments[ col ] && game.vars.segments[ col ][ row ] ) {
            return game.vars.segments[ col ][ row ];
        } else {
            return null;
        }
    };
    Map.prototype.getRandomSegment = function () {
        var col = Math.floor( game.vars.segments.length * Math.random() ),
            row = Math.floor( game.vars.segments[ col ].length * Math.random() );

        return game.vars.segments[ col ][ row ];
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