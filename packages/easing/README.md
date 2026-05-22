# easing
Easing functions library for animations and interpolation.

## Installation

```sh
npm install @rgsoft/easing
```

## Usage

```js
import {
  easeInSine,
  easeOutQuad,
  easeInOutElastic,
} from '@rgsoft/easing';

const progress = 0.5;
const value = easeInOutElastic(progress);
console.log(value);
```

### Available easing families

- `easeInSine`, `easeOutSine`, `easeInOutSine`
- `easeInQuad`, `easeOutQuad`, `easeInOutQuad`
- `easeInCubic`, `easeOutCubic`, `easeInOutCubic`
- `easeInQuart`, `easeOutQuart`, `easeInOutQuart`
- `easeInQuint`, `easeOutQuint`, `easeInOutQuint`
- `easeInExpo`, `easeOutExpo`, `easeInOutExpo`
- `easeInCirc`, `easeOutCirc`, `easeInOutCirc`
- `easeInBack`, `easeOutBack`, `easeInOutBack`
- `easeInElastic`, `easeOutElastic`, `easeInOutElastic`
- `easeInBounce`, `easeOutBounce`, `easeInOutBounce`

## Tests

```sh
npm run test
```
