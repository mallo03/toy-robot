import { describe, it, expect } from 'vitest';
import { report } from './robot.js';

describe('report', () => {
  it('returns current position of robot', () => {
    
    const robot = { x: 1, y: 2, facing: 'EAST' };
    const result = report(robot);

    expect(result.ok).toBe(true);
    expect(result.message).toBe('1, 2, EAST');
    expect(result.robot).toEqual(robot);
  });
});