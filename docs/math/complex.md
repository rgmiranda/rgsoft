# Complex Numbers

## Overview

The complex-number API models values in the form `a + bi` and keeps the underlying real and imaginary parts immutable.

- `Complex` — Immutable complex value container.
- `Complex.fromPolar(r, theta)` — Creates a complex number from a magnitude and angle.
- `add`, `sub`, `mult`, `div` — Adds, subtracts, multiplies, and divides by a scalar or another complex number.
- `pow`, `sqrt`, `exp`, `log`, `sin`, `cos`, `tan` — Applies standard complex functions.
- `conjugate`, `equals`, `isClose` — Returns the conjugate or compares values exactly or approximately.
- `mag`, `arg` — Access the magnitude and angle of the complex value.

```js
const cpx = new Complex(a, b);
```

> 📝 Every complex number is immutable; both the real and imaginary parts are readonly.

## Magnitude

```js
const c = new Complex(5, 12);
console.log(c.mag); // 13
```

## Conjugate

```js
const c = new Complex(2, 7);
console.log(`${c.conjugate()}`); // 2 - 7i
```

## Addition

### Scalar Addition

```js
// r + (a + bi) = (a + r) + bi
const c1 = new Complex(5, 12);
const c2 = c1.add(4);
console.log(`${c2}`); // 9 + 12i
```

### Complex Addition

```js
// (a + bi) + (c + di) = (a + c) + (b + d)i
const c1 = new Complex(4, -8);
const c2 = new Complex(-3, 6);
const c3 = c1.add(c2);
console.log(`${c3}`); // 1 + 2i
```

## Subtraction

### Scalar Subtraction

```js
// (a + bi) - r = (a - r) + bi
const c1 = new Complex(9, 1);
const c2 = c1.sub(10);
console.log(`${c2}`); // -1 + 1i
```

### Complex Subtraction

```js
// (a + bi) - (c + di) = (a - c) + (b - d)i
const c1 = new Complex(4, -8);
const c2 = new Complex(-3, 6);
const c3 = c1.sub(c2);
console.log(`${c3}`); // 7 - 14i
```

## Multiplication

### Scalar Multiplication

```js
// r (a + bi) = ra + bi
const c1 = new Complex(4, -1);
const c2 = c1.mult(-5);
console.log(`${c2}`); // -20 + 5i
```

### Complex Multiplication

```js
// (a + bi) (c + di) = (ac - bd) + (ad + bc)i
const c1 = new Complex(3, -1);
const c2 = new Complex(-2, 1);
const c3 = c1.mult(c2);
console.log(`${c3}`); // 1 + 5i
```

## Division

### Scalar Division

```js
// (a + bi) / r = a / r + (b / r)i
const c1 = new Complex(4, -1);
const c2 = c1.div(-2);
console.log(`${c2}`); // -2 + 0.5i
```

### Complex Division

```js
let c1 = new Complex(2, 1);
let c2 = new Complex(-1, -1);
let c3 = c1.div(c2);
console.log(`${c3}`); // -1.5 + 0.5i
```

## Square Root

```js
let c = new Complex(4, 0);
c = c.sqrt();
console.log(`${c}`); // 2 + 0i
```

## Power

```js
let c = new Complex(4, 0);
c = c.pow(3);
console.log(`${c}`); // 64 + 0i
```

## Exponential

```js
let c = new Complex(0, Math.PI);
c = c.exp();
console.log(`${c.real}`); // -1 (approximately)
```

## Logarithm

```js
let c = new Complex(1, 0);
c = c.log();
console.log(`${c.real}`); // 0
```

## Sine

```js
let c = new Complex(1, 0);
c = c.sin();
console.log(`${c.real}`); // Math.sin(1)
```

## Cosine

```js
let c = new Complex(1, 0);
c = c.cos();
console.log(`${c.real}`); // Math.cos(1)
```

## Tangent

```js
let c = new Complex(1, 2);
c = c.tan();
console.log(`${c}`); // Complex number result
```

## Equality

### Exact Equality

```js
let c1 = new Complex(4, 0);
let c2 = new Complex(4, 0);
console.log(c1.equals(c2)); // true
```

### Approximate Equality

```js
let c1 = new Complex(4, 0);
let c2 = new Complex(4 + 1e-8, 1e-8);
console.log(c1.isClose(c2, 1e-6)); // true
console.log(c1.isClose(c2, 1e-10)); // false
```

## Polar Constructor

```js
const z = Complex.fromPolar(5, Math.PI / 2);
console.log(`${z}`); // approximately 0 + 5i
```
