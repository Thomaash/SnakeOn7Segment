define( [ "segment/LED" ], function ( LED ) {
    /**
     *  -0-
     * 5   1
     *  -6-
     * 4   2
     *  -3-
     *
     * @param {Phaser.Group} group
     * @param {number} col
     * @param {number} row
     * @constructor
     */
    function SevenSegment( group, col, row ) {
        this.leds = [];
        var offsetX = col * (this.width + this.margin ) + this.margin / 2,
            offsetY = row * (this.height + this.margin) + this.margin / 2;

        for ( var i = 0; i < LED.prototype.position.length; ++i ) {
            this.leds[ i ] = new LED( group, offsetX, offsetY, i );
        }
    }

    SevenSegment.prototype = {
        margin      : 8,
        width       : 192,
        height      : 352,
        state       : {
            led    : LED.prototype.state,
            segment: {
                off: [ 0, 0, 0, 0, 0, 0, 0 ],
                0  : [ 1, 1, 1, 1, 1, 1, 0 ],
                1  : [ 0, 1, 1, 0, 0, 0, 0 ],
                2  : [ 1, 1, 0, 1, 1, 0, 1 ],
                3  : [ 1, 1, 1, 1, 0, 0, 1 ],
                4  : [ 0, 1, 1, 0, 0, 1, 1 ],
                5  : [ 1, 0, 1, 1, 0, 1, 1 ],
                6  : [ 1, 0, 1, 1, 1, 1, 1 ],
                7  : [ 1, 1, 1, 0, 0, 0, 0 ],
                8  : [ 1, 1, 1, 1, 1, 1, 1 ],
                9  : [ 1, 1, 1, 1, 0, 1, 1 ]
            }
        },
        setState    : function ( state, color ) {
            if ( color == null ) {
                color = "red";
            }
            if ( typeof state === "number" || typeof state === "string" ) {
                state = this.state.segment[ state ];
            }
            for ( var i = 0; i < this.leds.length; ++i ) {
                this.leds[ i ].setState( state[ i ] ? color : "black" );
            }
        },
        getRandomLED: function () {
            return this.leds[ Math.floor( 7 * Math.random() ) ];
        }
    };

    return SevenSegment;
} );