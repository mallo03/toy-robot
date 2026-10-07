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
    const oldFacing = DIRECTIONS.indexOf(robot.facing)
    const newFacing = DIRECTIONS[(oldFacing + DIRECTIONS.length - 1) % DIRECTIONS.length]
    return { robot: { ...robot, facing: newFacing}, ok: true}
}

export function right(robot) {
    const oldFacing = DIRECTIONS.indexOf(robot.facing)
    const newFacing = DIRECTIONS[(oldFacing + 1) % DIRECTIONS.length]
    return { robot: { ...robot, facing: newFacing}, ok: true}
}

export function report(robot) {
    const { x, y, facing} = robot
    return { robot, ok: true, message: `${x}, ${y}, ${facing}`}
}