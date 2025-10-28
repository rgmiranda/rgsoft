# Bases

## Converting to Other Bases

The `toBase` function gets the string representation of a given **positive integer**
in a certain base.

```javascript
console.log(toBase(255, 16), toBase(255, 2));
```

will ouput `FF 11111111`.

## Converting from Other Bases

The inverse process is achieved with the `fromBase` function.

```javascript
 console.log(fromBase('FF', 16), fromBase('11111111', 2));
```

outputs `255 255`.