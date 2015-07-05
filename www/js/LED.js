/**
 *  -0-
 * 5   1
 *  -6-
 * 4   2
 *  -3-
 *
 * @param {number} offsetX
 * @param {number} offsetY
 * @param {number} id
 * @constructor
 */
function LED( offsetX, offsetY, id ) {
    this.id = id;
    this.TL = {
        point: null,
        pos  : null
    };
    this.BR = {
        point: null,
        pos  : null
    };
    var pos = this.position[ id ],
        x   = offsetX + pos.x,
        y   = offsetY + pos.y;

    this.sprite = game.add.sprite( x, y, pos.type );
    this.sprite.frame = this.state.empty;
}
LED.prototype = {
    types    : {
        horizontal: 0, vertical: 90
    },
    state    : {
        black: 0, red: 1, yellow: 2, green: 3, darkGreen: 4,
        empty: 0, dead: 1, food: 2, snake: 3,
        max  : 4
    },
    position : [
        { x: 16, y: 0, type: "LEDHorizontal" }, // 0
        { x: 160, y: 16, type: "LEDVertical" }, // 1
        { x: 160, y: 176, type: "LEDVertical" }, // 2
        { x: 16, y: 320, type: "LEDHorizontal" }, // 3
        { x: 0, y: 176, type: "LEDVertical" }, // 4
        { x: 0, y: 16, type: "LEDVertical" }, // 5
        { x: 16, y: 160, type: "LEDHorizontal" } // 6
    ],
    setState : function ( state ) {
        if ( state > this.state.max ) {
            state = 0;
        }

        this.sprite.frame = state;
    },
    getState : function () {
        return this.sprite.frame;
    },
    getCenter: function () {
        return {
            x: this.sprite.world.x + this.sprite.width / 2,
            y: this.sprite.world.y + this.sprite.height / 2
        };
    }
};