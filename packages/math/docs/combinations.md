# Combinations and Permutations

Combinations and permutanios functions

## Factorial

Calculates the factorial of a **positive integer**.

```javascript
console.log(factorial(0)); // 1
console.log(factorial(3)); // 6
```

Optionally, it accepts a second parameter to set a lower limit. For example:

```javascript
console.log(factorial(6, 5)); // outputs 30, as 6 * 5 is 30
console.log(factorial(6, 4)); // outputs 120, as 6 * 5 * 4 is 120
```

This is specially useful for preventing excesive calculations while processing
the permutations and combinations.

## Permutations

Calculates the number of permutations of `k` elements, takon from a group of `n`.

```javascript
console.log(permutation(3, 0)); // 1
console.log(permutation(3, 3)); // 6
```

## Combinations

Calculates the number of combinations of `k` elements, takon from a group of `n`.

```javascript
console.log(combination(3, 1)); // 3
console.log(combination(3, 3)); // 1
```
