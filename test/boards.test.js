import { describe, expect, it } from 'vitest';
import BOARDS from '../app/config/boards';
import ELEMENT_TYPE from '../app/config/constants';

describe('board configurations', () => {
  it('contains playable square boards with one starting hole', () => {
    Object.values(BOARDS).forEach(board => {
      const side = Math.sqrt(board.Pins.length);
      expect(Number.isInteger(side)).toBe(true);
      expect(board.Pins.filter(value => value === ELEMENT_TYPE.HOLE).length).toBeGreaterThan(0);
      expect(board.Pins.filter(value => value === ELEMENT_TYPE.PIN).length).toBeGreaterThan(1);
    });
  });

  it('uses diagonal movement only for the rotated triangle board', () => {
    expect(BOARDS['English Triangle'].Rotation).toBe('rotate(45deg)');
    expect(BOARDS.Standard.Rotation).toBe('rotate(0deg)');
  });
});
