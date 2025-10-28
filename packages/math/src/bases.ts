const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

/**
 * Converts an integer to its string representation on a given base
 * @param { number } n Number
 * @param { number } b Base
 * @returns { string }
 */
export function toBase(n: number, b: number): string {
    if (!Number.isInteger(n) || n < 0) {
        throw new Error('The number must be positive integer');
    }

    if (!Number.isInteger(b) || b <= 0) {
        throw new Error('The base must be a positive integer');
    }
    
    if (b < 2) {
        throw new Error('The min base is 2');
    }
    
    if (b > alphabet.length) {
        throw new Error(`The max base allowed is ${alphabet.length}`);
    }

    let e = 1;
    const digits: string[] = [];
    while (n / (e * b) >= 1) {
        e *= b;
    }
    do {
        digits.push(alphabet[Math.floor(n / e)]);
        n = n % e;
        e /= b;
    } while (e >= 1);

    return digits.join('');
};

/**
 * Converts a string representing a number in a certain base to an integer
 * @param { string } d Digits
 * @param { number } b Base
 * @returns { string }
 */
export function fromBase(d: string, b: number): number {
    if (!Number.isInteger(b) || b <= 0) {
        throw new Error('The base must be a positive integer');
    }
    
    if (b < 2) {
        throw new Error('The min base is 2');
    }
    
    if (b > alphabet.length) {
        throw new Error(`The max base allowed is ${alphabet.length}`);
    }
    const digits = d.split('').reverse();
    return digits.reduce((prev: number, curr: string, e: number): number => {
        const n = alphabet.indexOf(curr);
        if (n < 0) {
            throw new Error(`Digit ${curr} not found`);
        }
        if (n >= b) {
            throw new Error(`Invalid digit ${curr} for base ${b}`);
        }
        return prev + n * (b ** e);
    }, 0);
};
