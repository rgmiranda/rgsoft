# Turtle

Turtle and L-Systems library

## L-Systems

The `LSystem` class is an implementation of the
[Lindenmayer systems](https://en.wikipedia.org/wiki/L-system) based on an
alphabet of symbols and production rules.

```js
const lsystem = new LSystem(axiom, rules);
```

The `axiom` is the base sentence from which future sentences will be generated
or inferred, and must be composed only by symbols of a defined alphabet.

The `rules` is an instance of `Map`, where each entry defines a
**production rule** for spawning the next generation sentence.

### Generation

The `generate` method in the `LSystem` class spawns new generations of the
current sentence.

```js
const axiom = 'F';
const rules = new Map([
  ['F', ['F', '[', '+', 'F', ']', '[', '-', 'G', ']']]
]);
const lsystem = new LSystem(axiom, rules);
console.log(lsystem.sentence); // F
lsystem.generate();
console.log(lsystem.sentence); // F[+F][-G]
```

This method also admits a number argument that indicates the number of
generations to generate.

```js
const axiom = 'F';
const rules = new Map([
  ['F', ['F', 'G']]
]);
const lsystem = new LSystem(axiom, rules);
console.log(lsystem.sentence); // F
lsystem.generate(4);
console.log(lsystem.sentence); // FGGGG
```

### Rules

Each entry in the rules map representa a production rule that allows the
generation from a symbol to an array of one or more symbols from the alphabet.
The `parseRules` is a util function receives an array of strings in the format
`Symbol=>Symbol+`, and returns a Map with the inferred entries.

```js
const str = 'F => FG';
const rules = parseRules[ str ];
console.log(rules.get('F')); // ['F', 'G']
const definitions = ['F : FFFFGH'];
parseRules(definitions); // Throws "Invalid rule: F : FFFFGH"
```

Alternatively, it accepts a second parameter `alphabet`, that specifies the
list of valid symbols.

```js
const definitions = ['F => FFFFGH'];
const alphabet = ['F', 'G'];
parseRules(definitions, alphabet) // Throws 'Unknown symbol "H" in rule: F => FFFFGH'
```
