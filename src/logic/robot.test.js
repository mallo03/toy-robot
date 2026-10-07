import { describe, it, expect } from 'vitest';
import { report, left, right } from './robot.js';

describe('report', () => {
  it('returns current position of robot', () => {

    const robot = { x: 1, y: 2, facing: 'EAST' };
    const result = report(robot);

    expect(result.ok).toBe(true);
    expect(result.message).toBe('1, 2, EAST');
    expect(result.robot).toEqual(robot);
  });
});

describe('left', () => {
  it('rotates left from NORTH', () => {
    const robot = { x: 1, y: 2, facing: 'NORTH' };
    const result = left(robot);

    expect(result.robot).toEqual({ x: 1, y: 2, facing: 'WEST' });
  });
});

describe('right', () => {
  it('rotates right from NORTH', () => {
    const robot = { x: 1, y: 2, facing: 'NORTH' };
    const result = right(robot);

    expect(result.robot).toEqual({ x: 1, y: 2, facing: 'EAST' });
  });
});