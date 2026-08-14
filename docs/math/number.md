# Number Functions

## Overview

The number utilities cover modular arithmetic, divisibility checks, prime generation, and classic sequence helpers.

- `mod(n, m)` — Returns `n` wrapped into the positive modular range `[0, m)`.
- `gcd(a, b)` — Computes the greatest common divisor of two positive integers.
- `lcm(a, b)` — Computes the least common multiple of two positive integers.
- `prime(n)` — Checks whether a positive integer is prime.
- `coprime(a, b)` — Checks whether two positive integers share no common divisor.
- `factors(n)` — Returns the prime factorization as a flat array of prime factors.
- `totient(m)` — Computes Euler's totient for a positive integer.
- `collatz(n, limit?)` — Produces the Collatz sequence up to a limit.
- `digitalRoots(n)` — Repeatedly sums digits until a single digit remains.
- `sieveEratosthenes(n)` — Generates all primes below `n` using a sieve.

## Modulo

The `mod` function calculates the modular remainder of a number `n` modulo `m`. The main difference between this function and the remainder operator `%` is that `mod` keeps the result in a normalized positive range.

```javascript
console.log(-1 % 4); // -1
console.log(mod(-1, 4)); // 3
```

The `mod` function rejects negative modulo values and non-integer inputs.

## Greatest Common Divisor

The `gcd` function calculates the greatest common divisor between two positive integers.

```javascript
console.log(gcd(18, 4)); // 2
```

## Least Common Multiple

The `lcm` function calculates the least common multiple between two positive integers.

```javascript
console.log(lcm(18, 4)); // 36
```

## Prime Check

The `prime` helper checks whether a positive integer is prime.

```javascript
console.log(prime(17)); // true
```

## Coprimality

The `coprime` helper checks whether two positive integers share no common divisor.

```javascript
console.log(coprime(8, 15)); // true
console.log(coprime(8, 12)); // false
```

## Prime Factorization

The `factors` function returns the prime factors of a positive integer in order.

```javascript
console.log(factors(48)); // [2, 2, 2, 2, 3]
```

## Totient

The `totient` function computes Euler's totient value for a positive integer.

```javascript
console.log(totient(100)); // 40
```

## Collatz Sequence

The `collatz` function produces the Collatz sequence from a positive integer.

```javascript
console.log(collatz(5)); // [5, 16, 8, 4, 2, 1]
```

Optionally, it accepts a second parameter that limits the maximum length of the resulting sequence.

```javascript
console.log(collatz(5, 5)); // [5, 16, 8, 4, 2]
```

## Digital Roots

The `digitalRoots` function repeatedly sums the digits of a positive integer until a single digit remains.

```javascript
console.log(digitalRoots(19)); // 1
```

## Sieve of Eratosthenes

The `sieveEratosthenes` function generates all prime numbers below `n` using the Sieve of Eratosthenes algorithm.

```javascript
console.log(sieveEratosthenes(10)); // [2, 3, 5, 7]
```
