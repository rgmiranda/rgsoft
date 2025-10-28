export function mod(n: number, m: number): number {
    if (!Number.isInteger(n)) {
        throw new Error('The number must be an integer')
    }

    if (!Number.isInteger(m) || m <= 0) {
        throw new Error('Modulo must be a positive integer');
    }

    return ((n % m) + m) % m;
};

/**
 * Gets the greatest common divisor
 * @param { number } a
 * @param { number } b
 */
export function gcd(a: number, b: number): number {
    if (!Number.isInteger(a) || a <= 0 || !Number.isInteger(b) || b <= 0) {
        throw new Error("Both numbers must be positive integers");
    }
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return a;
};

/**
 * Gets least common multiple
 * @param { number } a
 * @param { number } b
 */
export function lcm(a: number, b: number): number {
    if (!Number.isInteger(a) || a <= 0) {
        throw new Error('Both numbers must be positive integers');
    }
    if (!Number.isInteger(b) || b <= 0) {
        throw new Error('Both numbers must be positive integers');
    }
    const d = gcd(a, b);
    return a * b / d;
};

/**
 * Checks if a number is prime
 * @param { number } n
 * @returns { boolean }
 */
export function prime(n: number): boolean {
    if (!Number.isInteger(n) || n <= 0) {
        throw new Error('The number must be positive integer');
    }
    const l = Math.sqrt(n);
    for (let i = 2; i <= l; i++) {
        if ((n % i) === 0) {
            return false;
        }
    }
    return true;
};

/**
 * Checks if a number is coprime with another
 * @param { number } a
 * @param { number } b
 * @returns { boolean }
 */
export function coprime(a: number, b: number): boolean {
    if (!Number.isInteger(a) || a <= 0) {
        throw new Error('Positive integer expected');
    }
    if (!Number.isInteger(b) || b <= 0) {
        throw new Error('Positive integer expected');
    }
    return gcd(a, b) === 1;
};

/**
 * Get the prime factorization of a positive integer
 * @param { number } n
 * @returns { number[] }
 */
export function factors(n: number): number[] {
    if (!Number.isInteger(n) || n <= 0) {
        throw new Error('The number must be positive integer');
    }
    const factors: number[] = [];

    if (n === 1) {
        return [1];
    }

    let i = 2;
    
    while (n > 1) {
        if ((n % i) === 0) {
            n /= i;
            factors.push(i);
        } else {
            i++;
        }
    }
    return factors;
};

/**
 * Gets the totient of a posite integer
 * @param { number } m
 * @returns { number }
 */
export function totient(m: number): number {
    if (!Number.isInteger(m) || m <= 0) {
        throw new Error('The number must be positive integer');
    }
    const factorization = factors(m);
    const uniqueFactors = factorization.filter((item, index, self) => {
      return self.indexOf(item) === index;
    });
    let a = 1;
    let b = 1;
    uniqueFactors.forEach(f => {
        a *= f;
        b *= f - 1;
    });

    return b * m / a; 
};

/**
 * Generates de Collatz sequence
 * @param { number } n
 * @param { number } limit
 * @returns { number }
 */
export function collatz(n: number, limit: number = 10000): number[] {
    if (!Number.isInteger(n) || n <= 0) {
        throw new Error('The number must be positive integer');
    }

    const seq = [n];

    for (let i = 1; i < limit; i++) {
        if (n === 1) {
            break;
        }
        if ((n % 2) === 0) {
            n = n * 0.5;
        } else {
            n = 3 * n +1;
        }
        seq.push(n);
    }

    return seq;
};

/**
 * Gets the digital roots of a positive integer
 * @param { number } n
 * @returns { number }
 */
export function digitalRoots(n: number): number {
    if (!Number.isInteger(n) || n <= 0) {
        throw new Error('The number must be positive integer');
    }
    if (n < 10) {
        return n;
    }
    do {
        let chars = n.toString().split('');
        n = chars.reduce((prev, c) => prev += Number(c), 0);
    } while (n >= 10);

    return n;
};

/**
 * Generates all prime numbers up to a given integer `n` using the
 * Sieve of Eratosthenes algorithm with bit-packing optimization.
 *
 * Uses a `Uint32Array` as a compact bitset, where each bit represents
 * whether a number has been marked as composite.
 *
 * @param {number} n - Upper bound (inclusive). Must be >= 2.
 * @returns {number[]} An array of prime numbers in the range [2, n].
 *
 * @example
 * sieveEratosthenes(10); // [2, 3, 5, 7]
 */
export function sieveEratosthenes(n: number): number[] {
    if (n < 2) {
        throw new Error('Integer greater than 2 expected');
    }
    const numBits = 32;
    const nonPrime = new Uint32Array(Math.ceil((n + 1) / numBits));
    const primes: number[] = [];
    for (let i = 2; i < n; i++) {
        const word = Math.floor(i / numBits);
        const bit = i % numBits;

        if ((nonPrime[word] & (1 << bit)) !== 0) {
            continue;
        }
        primes.push(i);
        for (let multiple = i * i; multiple < n; multiple += i) {
            const w = Math.floor(multiple / numBits);
            const b = multiple % numBits;
            nonPrime[w] = nonPrime[w] | (1 << b);
        }
    }
    return primes;
}
