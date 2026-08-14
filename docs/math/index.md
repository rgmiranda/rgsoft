# Math Library

The math utilities package provides a compact collection of numerical helpers for JavaScript and TypeScript projects. It covers base conversion, combinatorics, complex arithmetic, integer number theory, and common interpolation and tolerance utilities in one dependency-free API.

This package is especially useful for algorithms, simulations, and data-processing code that need fast access to modular arithmetic, prime checks, complex values, and normalized numeric operations without bringing in a larger external math dependency.

## Contents

- [Bases](bases.md) — Convert integers to and from arbitrary numeral bases with `toBase` and `fromBase`.
- [Combinations](combinations.md) — Compute factorials, permutations, and combinations.
- [Complex Numbers](complex.md) — Model immutable complex values and perform arithmetic with the `Complex` class.
- [Number](number.md) — Work with modular arithmetic, divisibility, primality, and sequence helpers.
- [Utils](utils.md) — Generate ranges, interpolate values, clamp inputs, and compare numeric approximations.

## Highlights

The library exports core math helpers such as `gcd`, `lcm`, `mod`, `prime`, and `totient`, along with constants like `PI`, `TAU`, `PHI`, and `EPSILON` for common numerical work.
