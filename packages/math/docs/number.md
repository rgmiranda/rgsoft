# Number Functions

## Modulo

The `mod` function calculates the modular remainder of a number `n` modulo `m`.
The main diference between this function and the remainder operator `%` is that
the `mod` function applies the modular arithmetic strictly. For example

```javascript
console.log(-1 % 4);
```

will output `-1`. Whereas using the `mod`:

```javascript
console.log(mod(-1, 4));
```

we should get `3`.

The `mod` function will fail if it receives a negative modulo or any non-integer
number.

## Greatest Common Divisor

The `gcd` function calculates greatest common divisor between to positive
integers

```javascript
console.log(gcd(18, 4));
```

will ouput `2`.

## Least Common Multiple

The `lcm` function calculates least common multple between to positive integers

```javascript
console.log(lcm(18, 4));
```

will ouput `36`.

## Is a Number Prime

The `prime` checks if a positive integer is prime or not

```javascript
console.log(prime(17));
```

will ouput `true`.

## Prime Factorization

The `factors` function gets the prime factors with their respective exponents

```javascript
console.log(factors(48));
```

will ouput `[ [2, 4], [3, 1] ]`, where each element of the array is another
array with two numbers:

1. The prime factor
2. The exponent of the factor

In the example, this means that `48` is `2^4 + 3^1`.

## Number Totient

The `totient` function gets the [totient](https://en.wikipedia.org/wiki/Euler%27s_totient_function)
from a positive integer, that is, the number of prime numbers from 1 to `n-1`
for a given integer `n`.

```javascript
console.log(totient(100));
```

will ouput `40`.

## Collatz Sequence

The `collatz` function gets the [collatz](https://en.wikipedia.org/wiki/Collatz_conjecture)
sequence from a positive integer.

```javascript
console.log(collatz(5));
```

will ouput `[ 5, 16, 8, 4, 2, 1 ]`.

Optionally, it accepts a second parameter that limits the maximum length of the
resulting sequence.

```javascript
console.log(collatz(5, 5));
```

will ouput `[ 5, 16, 8, 4, 2 ]`.

## Digital Roots

The `digitalRoots` function gets the digital roots from a positive integer, that
is, the sum of all its digits.

```javascript
console.log(digitalRoots(19));
```

will ouput `1`.

## Sieve of Eratosthenes

Generates all prime numbers up to a given integer `n` using the Sieve of Eratosthenes algorithm with bit-packing optimization.

```javascript
sieveEratosthenes(10); // [2, 3, 5, 7]
```
