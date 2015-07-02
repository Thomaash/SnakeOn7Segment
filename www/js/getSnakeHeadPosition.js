function getSnakeHeadPosition() {
    var head    = game.vars.snake[ game.vars.snake.length - 1 ],
        headPos = head.getCenter(); // Position in canvas

    return { x: headPos.x, y: headPos.y };
}