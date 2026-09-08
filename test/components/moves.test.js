import { describe, expect, it } from 'vitest';
import { getDiagonalMiddlePinPosition } from '../../app/components/Game';

describe('diagonal moves', () => {
  it('rejects flat-index wraparound at the top-right and bottom-left edges', () => {
    expect(getDiagonalMiddlePinPosition(4, 16, 5)).toBe(null);
    expect(getDiagonalMiddlePinPosition(16, 4, 5)).toBe(null);
  });

  it('returns the single midpoint for a valid two-step diagonal', () => {
    expect(getDiagonalMiddlePinPosition(0, 12, 5)).toBe(6);
    expect(getDiagonalMiddlePinPosition(12, 0, 5)).toBe(6);
  });
});