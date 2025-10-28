import { describe, expect, it } from "vitest";
import { combination, factorial, permutation } from "../src";

describe(factorial.name, () => {

    const toData = [
        [0, 1],
        [3, 6],
        [4, 24],
        [5, 120],
        [6, 720],
    ];

    const fromToData = [
        [0, 0, 1],
        [6, 5, 30],
        [6, 1, 720],
        [6, 2, 720],
        [10, 9, 90],
        [10, 8, 720],
    ];

    it.each(toData)('calculates the factorial', (n: number, expected: number) => {
        expect(factorial(n)).toBe(expected);
    });

    it.each(fromToData)('calculates the factorial with limit', (n: number, m: number, expected: number) => {
        expect(factorial(n, m)).toBe(expected);
    });

    it('fails on invalid number', () => {
        expect(() => factorial(-9)).toThrowError();
        expect(() => factorial(9.5)).toThrowError();
    });

    it('fails on invalid lower limit', () => {
        expect(() => factorial(9, -8)).toThrowError();
        expect(() => factorial(9, 8.1)).toThrowError();
    });

    it('fails on lower limit higher than number', () => {
        expect(() => factorial(9, 10)).toThrowError();
        expect(() => factorial(0, 1)).toThrowError();
    });

});

describe(combination.name, () => {
    const combinationData = [
        [3, 1, 3],
        [3, 3, 1],
        [3, 0, 1],
        [10, 2, 45],
        [10, 1, 10],
        [10, 5, 252],
    ];

    it.each(combinationData)('calculates the combinations', (n: number, k: number, expected: number) => {
        expect(combination(n, k)).toBe(expected);
    });
    
    it('fails on invalid number', () => {
        expect(() => combination(-9, 1)).toThrowError();
        expect(() => combination(9.5, 1)).toThrowError();
    });

    it('fails on invalid group', () => {
        expect(() => combination(9, -8)).toThrowError();
        expect(() => combination(9, 8.1)).toThrowError();
    });    

    it('fails on group higher than number', () => {
        expect(() => combination(9, 10)).toThrowError();
        expect(() => combination(0, 1)).toThrowError();
    });
});

describe(permutation.name, () => {
    const permutationData = [
        [3, 0, 1],
        [3, 3, 6],
        [3, 1, 3],
        [5, 1, 5],
        [5, 5, 120],
    ];

    it.each(permutationData)('calculates the permutations', (n: number, k: number, expected: number) => {
        expect(permutation(n, k)).toBe(expected);
    });
    
    it('fails on invalid number', () => {
        expect(() => permutation(-9, 1)).toThrowError();
        expect(() => permutation(9.5, 1)).toThrowError();
    });

    it('fails on invalid group', () => {
        expect(() => permutation(9, -8)).toThrowError();
        expect(() => permutation(9, 8.1)).toThrowError();
    });    

    it('fails on grupo higher than number', () => {
        expect(() => permutation(9, 10)).toThrowError();
        expect(() => permutation(0, 1)).toThrowError();
    });
});