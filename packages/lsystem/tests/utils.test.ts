import { describe, expect, it } from "vitest";
import { parseRules } from "../src";

describe("Utils module", () => {
  describe(parseRules.name, () => {

    it('parses rules correctly', () => {
      const definitions = [
        'F => FG',
        'G => GF',
        'G => G F',
      ];
      const rules = parseRules(definitions);
      expect(rules.size).toBe(2);
      expect(rules.has('F')).toBeTruthy();
      expect(rules.has('G')).toBeTruthy();
      expect(rules.has('H')).toBeFalsy();
      expect(rules.get('F')).toEqual(['F', 'G']);
      expect(rules.get("G")).toEqual(['G', 'F']);
    });

    it('fails on invalid rule', () => {
      const definitions = ['F : FFFFGH'];
      expect(() => parseRules(definitions)).toThrowError(
        "Invalid rule: F : FFFFGH"
      );
    });

    it('fails on invalid symbol', () => {
      const definitions = ['F => FFFFGH'];
      const alphabet = ['F', 'G'];
      expect(() => parseRules(definitions, alphabet)).toThrowError(
        'Unknown symbol "H" in rule: F => FFFFGH'
      );
      definitions[0] = 'X => GFFFFG';
      expect(() => parseRules(definitions, alphabet)).toThrowError(
        'Unknown symbol "X" in rule: X => GFFFFG'
      );
      definitions[0] = 'F => GFFFFG';
      expect(() => parseRules(definitions, alphabet)).not.toThrow();
    });
  });
});
