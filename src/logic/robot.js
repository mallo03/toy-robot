const GRID_SIZE = 5;
const DIRECTIONS = ['NORTH', 'EAST', 'SOUTH', 'WEST'];

// All funcs need to return ok: true or false (failed or succeeded)

export function place(x, y, facing) {
    // todo
}

export function move(robot) {
    // todo
}

export function left(robot) {
    // todo
}

export function right(robot) {
    // todo
}

export function report(robot) {
    const { x, y, facing} = robot
    return { robot, ok: true, message: `${x}, ${y}, ${facing}`}
}