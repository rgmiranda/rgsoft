import { describe, expect, it } from 'vitest';
import { xmur3 } from '../../src/utils';
describe(xmur3.name, () => {
  const testData: [string, number[]][] = [
    ["hello", [0xd5e71ed9, 0x97727e9e, 0x741484c3, 0x30b04f63]],
    ["world", [0x85c90e8, 0xe9336dc9, 0x96695f09, 0xe56a365 ]],
    ["test", [ 0xb14a35c8, 0x4dd59cf8, 0x2bc10d39, 0x5b988a13]],
    ["noise", [0xab87a52a, 0x66e1af23, 0x56f07e69, 0x734860c6]],
    ["random", [0x1ebb94b2, 0xf89ac7d3, 0x839916ce, 0xf404683d]],
  ];

  it.each(testData)('should generate hash values for given string', (input, expected) => {
    const hashFn = xmur3(input);
    const results = [];
    for (let i = 0; i < expected.length; i++) {
      results.push(hashFn());
    }
    expect(results).toEqual(expected);
  });
});
