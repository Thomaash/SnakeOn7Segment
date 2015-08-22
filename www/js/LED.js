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
    this.pos = this.position[ id ];

    this.sprite = game.vars.groups.leds.create( offsetX + this.pos.x, offsetY + this.pos.y, "LEDs" );
    this.sprite.x *= game.vars.scale.leds;
    this.sprite.y *= game.vars.scale.leds;
    this.setState( this.state.empty );
}
LED.prototype = {
    state    : {
        black: "black", red: "red", yellow: "yellow", green: "green", darkGreen: "darkGreen",
        empty: "black", dead: "red", food: "yellow", snake: "green",
        0    : "black", 1: "red", 2: "yellow", 3: "green", 4: "darkGreen" // Backward compatibility
    },
    position : [
        { x: 17, y: 0, type: "h" }, // 0
        { x: 160, y: 17, type: "v" }, // 1
        { x: 160, y: 177, type: "v" }, // 2
        { x: 17, y: 320, type: "h" }, // 3
        { x: 0, y: 177, type: "v" }, // 4
        { x: 0, y: 17, type: "v" }, // 5
        { x: 17, y: 160, type: "h" } // 6
    ],
    setState : function ( state ) {
        this.state = state;
        this.sprite.frameName = this.pos.type + state + ".png";
    },
    getState : function () {
        return this.state;
    },
    getCenter: function () {
        return {
            x: this.sprite.world.x + this.sprite.width / 2,
            y: this.sprite.world.y + this.sprite.height / 2
        };
    },
    destroy  : function () {
        this.sprite.destroy();
    }
};