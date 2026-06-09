import { describe, expect, it } from 'vitest';
import { shuffle } from '../../src/utils';

describe(shuffle.name, () => {
  const testData = [1, 2, 3, 4, 5];

  it('should shuffle the array in a deterministic way', () => {
    const random = () => 0.5;
    const result = shuffle(testData, random);
    expect(result).toEqual([1, 4, 2, 5, 3]);
  });
});
