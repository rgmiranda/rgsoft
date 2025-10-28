import { describe, expect, it } from "vitest";
import { fromBase, toBase } from "../src";

describe(toBase.name, () => {

    const toBaseData = [
        [16, 2, '10000'],
        [15, 2, '1111'],
        [63, 8, '77'],
        [16, 8, '20'],
        [15, 16, 'F'],
        [10, 12, 'A'],
    ];
    
    it.each(toBaseData)('gets the string representation', (n: any, b: any, expected: any) => {
        const result = toBase(n, b);
        expect(result).toBe(expected);
    });

    it('fails on negative number', () => {
        expect(() => toBase(-3, 5)).toThrowError('The number must be positive integer');
    });

    it('fails on negative base', () => {
        expect(() => toBase(3, -5)).toThrowError('The base must be a positive integer');
    });

    it('fails on low base', () => {
        expect(() => toBase(3, 1)).toThrowError('The min base is 2');
    });

    it('fails on high base', () => {
        expect(() => toBase(3, 64)).toThrowError('The max base allowed is 36');
    });
});

describe(fromBase.name, () => {

    const fromBaseData = [
        ['10000', 2, 16],
        ['1111', 2, 15],
        ['77', 8, 63],
        ['20', 8, 16],
        ['F', 16, 15],
        ['A', 12, 10],
    ];
    
    it.each(fromBaseData)('gets the number from the string', (s: any, b: any, expected: any) => {
        const result = fromBase(s, b);
        expect(result).toBe(expected);
    });

    it('fails on negative base', () => {
        expect(() => fromBase('2134', -5)).toThrowError('The base must be a positive integer');
    });

    it('fails on low base', () => {
        expect(() => fromBase('3', 1)).toThrowError('The min base is 2');
    });

    it('fails on high base', () => {
        expect(() => fromBase('3', 64)).toThrowError('The max base allowed is 36');
    });

    it('fails unexistent digit', () => {
        expect(() => fromBase('3*', 10)).toThrowError('Digit * not found');
    });

    it('fails invalid digit for base', () => {
        expect(() => fromBase('39', 8)).toThrowError('Invalid digit 9 for base 8');
    });
});