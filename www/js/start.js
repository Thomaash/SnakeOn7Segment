function start() {
    // Turn off help
    game.vars.ui.elements.leftArrow.visible = false;
    game.vars.ui.elements.rightArrow.visible = false;

    // Change update function
    game.vars.functions.update = update;
}