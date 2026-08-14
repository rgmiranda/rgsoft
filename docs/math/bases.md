# Bases

## Overview

The base-conversion utilities encode and decode integers using custom numeral systems. They are useful for serialization, number formatting, and converting values between arbitrary bases.

- `toBase(n, b)` — Converts a non-negative integer to its string representation in the target base.
- `fromBase(d, b)` — Parses a numeral string in a chosen base and returns its integer value.

## Converting to Other Bases

The `toBase` function gets the string representation of a given positive integer in a certain base.

```javascript
console.log(toBase(255, 16), toBase(255, 2));
```

This prints `FF 11111111`.

## Converting from Other Bases

The inverse process is achieved with the `fromBase` function.

```javascript
console.log(fromBase('FF', 16), fromBase('11111111', 2));
```

This prints `255 255`.