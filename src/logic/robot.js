export const GRID_SIZE = 5;
const DIRECTIONS = ["NORTH", "EAST", "SOUTH", "WEST"];

// All funcs need to return ok: true or false (failed or succeeded)
// Robot should look like { x: 1, y: 2, facing: 'NORTH' }

export function place(robot, x, y, facing) {
  if (!Number.isInteger(x) || !Number.isInteger(y)) {
    return { robot, ok: false, message: "x and y must be integers" };
  }

  if (x < 0 || x > GRID_SIZE - 1 || y < 0 || y > GRID_SIZE - 1) {
    return {
      robot,
      ok: false,
      message: "Position has to be within table size",
    };
  }

  if (!DIRECTIONS.includes(facing)) {
    return {
      robot,
      ok: false,
      message: "Facing must be NORTH, SOUTH, EAST or WEST",
    };
  }

  return { robot: { x, y, facing }, ok: true };
}

export function move(robot) {
  let { x, y } = robot;
  switch (robot.facing) {
    case "NORTH":
      y += 1;
      break;
    case "SOUTH":
      y -= 1;
      break;
    case "EAST":
      x += 1;
      break;
    case "WEST":
      x -= 1;
      break;
  }

  if (x > GRID_SIZE - 1 || x < 0 || y > GRID_SIZE - 1 || y < 0) {
    return { robot, ok: false };
  }

  return { robot: { ...robot, x, y }, ok: true };
}

export function left(robot) {
  const oldFacing = DIRECTIONS.indexOf(robot.facing);
  const newFacing =
    DIRECTIONS[(oldFacing + DIRECTIONS.length - 1) % DIRECTIONS.length];
  return { robot: { ...robot, facing: newFacing }, ok: true };
}

export function right(robot) {
  const oldFacing = DIRECTIONS.indexOf(robot.facing);
  const newFacing = DIRECTIONS[(oldFacing + 1) % DIRECTIONS.length];
  return { robot: { ...robot, facing: newFacing }, ok: true };
}

export function report(robot) {
  const { x, y, facing } = robot;
  return { robot, ok: true, message: `${x}, ${y}, ${facing}` };
}
