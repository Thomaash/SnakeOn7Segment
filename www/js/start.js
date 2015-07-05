function start() {
    // Turn off help
    game.vars.ui.arrow.l.destroy();
    game.vars.ui.arrow.r.destroy();

    // Change update function
    game.vars.functions.update = update;
}