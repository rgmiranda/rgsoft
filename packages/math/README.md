# Math

A compact collection of dependency-free numerical utilities for JavaScript and TypeScript. Use it for algorithms, simulations, and data-processing tasks involving number theory, combinatorics, complex numbers, base conversion, and common numeric helpers.

## Installation

```sh
npm install @rgsoft/math
```

## Documentation

- [Main Documentation](https://github.com/rgmiranda/rgsoft/blob/main/docs/math/index.md) — Overview and quick start guide
- [Bases](https://github.com/rgmiranda/rgsoft/blob/main/docs/math/bases.md) — Convert values to and from arbitrary numeral bases
- [Combinations](https://github.com/rgmiranda/rgsoft/blob/main/docs/math/combinations.md) — Factorials, permutations, and combinations
- [Complex Numbers](https://github.com/rgmiranda/rgsoft/blob/main/docs/math/complex.md) — Immutable complex values and arithmetic
- [Number Functions](https://github.com/rgmiranda/rgsoft/blob/main/docs/math/number.md) — Modular arithmetic, divisibility, primes, and sequences
- [Utility Functions](https://github.com/rgmiranda/rgsoft/blob/main/docs/math/utils.md) — Ranges, interpolation, clamping, and approximate comparisons

## Quick Start

```typescript
import { clamp, gcd, lerp, prime } from '@rgsoft/math';

const progress = clamp(1.2, 0, 1);
const position = lerp(10, 30, progress);

console.log(position); // 30
console.log(gcd(84, 30)); // 6
console.log(prime(31)); // true
```

## Examples

### Complex Arithmetic

Complex values are immutable, so operations return new values without changing their operands.

```typescript
import { Complex } from '@rgsoft/math';

const signal = new Complex(3, 4);
const rotated = signal.mult(Complex.i);

console.log(signal.mag); // 5
console.log(`${rotated}`); // -4 + 3i
```

### Combinatorics and Bases

```typescript
import { combination, factorial, fromBase, toBase } from '@rgsoft/math';

console.log(factorial(5)); // 120
console.log(combination(5, 2)); // 10
console.log(toBase(255, 16)); // "FF"
console.log(fromBase("FF", 16)); // 255
```

## Features

- **Number theory** — Modular arithmetic, GCD/LCM, factors, primes, totients, and sequences
- **Complex numbers** — Immutable values with arithmetic and standard complex functions
- **Combinatorics** — Factorials, permutations, and combinations
- **Numeric utilities** — Ranges, interpolation, clamping, mapping, and tolerance checks
- **Base conversion** — Convert integers between arbitrary numeral bases
- **TypeScript support** — Fully typed and dependency-free

## Tests

```sh
npm run test
```
