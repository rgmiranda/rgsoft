# Linear

A comprehensive linear algebra library providing vector and matrix operations for 2D, 3D, and n-dimensional mathematics.

## Installation

```sh
npm install @rgsoft/linear
```

## Documentation

- [Main Documentation](https://github.com/rgmiranda/rgsoft/blob/main/docs/linear/index.md) — Overview and quick start guide
- [Vectors Guide](https://github.com/rgmiranda/rgsoft/blob/main/docs/linear/vectors.md) — Complete reference for Vector, Vector2, and Vector3
- [Matrices Guide](https://github.com/rgmiranda/rgsoft/blob/main/docs/linear/matrices.md) — Complete reference for Matrix operations

## Quick Start

```typescript
import { Vector2, Vector3, Matrix } from '@rgsoft/linear';

// 2D vectors
const v1 = new Vector2([3, 4]);
const v2 = new Vector2([1, 2]);
console.log(v1.mag);        // 5
console.log(v1.dot(v2));    // 11
console.log(v1.rotate(Math.PI / 4));

// 3D vectors
const v3 = new Vector3([1, 0, 0]);
const v4 = new Vector3([0, 1, 0]);
console.log(v3.cross(v4));  // Vector3([0, 0, 1])

// Matrices
const m = new Matrix(2, 2, [[1, 2], [3, 4]]);
console.log(m.det);         // -2
console.log(m.inverse());
```

## Features

- **Vector Support** — Generic n-dimensional vectors, optimized 2D and 3D classes
- **Rich Operations** — Add, subtract, multiply, dot product, cross product, normalize, rotate, project
- **Matrix Operations** — Determinant, inverse, transpose, row operations, Gaussian elimination
- **Immutable Design** — All operations return new instances, original unchanged
- **Performance** — Caching for magnitude and determinant, optimized for real-time use
- **Constants** — Pre-defined unit vectors and zero vectors
- **TypeScript Support** — Fully typed

## Development

```sh
npm run build    # Build the package
npm run test     # Run tests
npm run coverage # Generate coverage report
```
