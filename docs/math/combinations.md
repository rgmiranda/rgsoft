# Combinations and Permutations

## Overview

The combinatorics utilities compute counts for selecting and ordering elements from a set.

- `factorial(n, m?)` — Calculates `n!` or a partial factorial from `n` down to `m`.
- `permutation(n, k)` — Counts the number of ordered selections of `k` items from `n`.
- `combination(n, k)` — Counts the number of unordered selections of `k` items from `n`.

## Factorial

Calculates the factorial of a positive integer.

```javascript
console.log(factorial(0)); // 1
console.log(factorial(3)); // 6
```

Optionally, it accepts a second parameter to set a lower limit. For example:

```javascript
console.log(factorial(6, 5)); // 30, as 6 * 5 is 30
console.log(factorial(6, 4)); // 120, as 6 * 5 * 4 is 120
```

This is especially useful for preventing excessive calculations while processing permutations and combinations.

## Permutations

Calculates the number of permutations of `k` elements taken from a group of `n`.

```javascript
console.log(permutation(3, 0)); // 1
console.log(permutation(3, 3)); // 6
```

## Combinations

Calculates the number of combinations of `k` elements taken from a group of `n`.

```javascript
console.log(combination(3, 1)); // 3
console.log(combination(3, 3)); // 1
```
