define( [], function () {
    return function () {
        // Delete UI
        game.vars.ui.elements.leftArrow = null;
        game.vars.ui.elements.rightArrow = null;
        game.vars.ui.elements.centerScreenText = null;

        // Delete map
        game.map = null;
    };
} );