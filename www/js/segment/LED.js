define( [], function () {
    /**
     *  -0-
     * 5   1
     *  -6-
     * 4   2
     *  -3-
     *
     * @param {Phaser.Group} group
     * @param {number} offsetX
     * @param {number} offsetY
     * @param {number} id
     * @param {number} [scale]
     * @constructor
     */
    function LED( group, offsetX, offsetY, id, scale ) {
        this.id = id;
        this.TL = {
            point: null,
            pos  : null
        };
        this.BR = {
            point: null,
            pos  : null
        };
        this.pos = this.position[ id ];

        this.sprite = group.create( offsetX + this.pos.x, offsetY + this.pos.y, "LEDs" );
        this.sprite.x *= scale || 1;
        this.sprite.y *= scale || 1;
        this.setState( this.states.empty );
    }

    LED.prototype = {
        states  : {
            black: "black", red: "red", yellow: "yellow", green: "green", darkGreen: "darkGreen",
            empty: "black", dead: "red", food: "yellow", snakeHead: "green", snake: "darkGreen",
            0    : "black", 1: "red", 2: "yellow", 3: "green", 4: "darkGreen" // Backward compatibility
        },
        position: [
            { x: 17, y: 0, type: "h" }, // 0
            { x: 160, y: 17, type: "v" }, // 1
            { x: 160, y: 177, type: "v" }, // 2
            { x: 17, y: 320, type: "h" }, // 3
            { x: 0, y: 177, type: "v" }, // 4
            { x: 0, y: 17, type: "v" }, // 5
            { x: 17, y: 160, type: "h" } // 6
        ],
        setState: function ( state ) {
            this.state = state;
            this.sprite.frameName = this.pos.type + state;
        },
        getState: function () {
            return this.state;
        }
    };

    return LED;
} );