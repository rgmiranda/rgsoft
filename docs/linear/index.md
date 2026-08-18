# Linear Algebra Library

A comprehensive linear algebra library providing vector and matrix operations for 2D, 3D, and n-dimensional mathematics. This library is essential for graphics programming, physics simulations, game development, 3D geometry, and any application requiring vector or matrix computations.

This package is built with performance and usability in mind, offering both generic n-dimensional vectors and specialized 2D and 3D vector classes with optimized operations.

## Contents

- [Vectors Guide](vectors.md) — Complete reference for Vector, Vector2, and Vector3 classes
- [Matrices Guide](matrices.md) — Complete reference for Matrix operations and transformations

## Quick Start

### 2D Vectors

```typescript
import { Vector2 } from '@rgsoft/linear';

// Create vectors
const v1 = new Vector2([3, 4]);
const v2 = new Vector2([1, 2]);

// Basic operations
console.log(v1.mag);           // 5 (magnitude)
console.log(v1.add(v2));       // Vector2([4, 6])
console.log(v1.dot(v2));       // 11 (dot product)
console.log(v1.cross(v2));     // -2 (2D cross product)

// Rotate vector
const rotated = v1.rotate(Math.PI / 4);  // Rotate 45 degrees
```

### 3D Vectors

```typescript
import { Vector3 } from '@rgsoft/linear';
import { PI } from '@rgsoft/math';

// Create vectors
const v1 = new Vector3([1, 2, 3]);
const v2 = new Vector3([4, 5, 6]);

// Operations
console.log(v1.mag);           // ~3.74 (magnitude)
console.log(v1.add(v2));       // Vector3([5, 7, 9])
console.log(v1.cross(v2));     // Vector3([-3, 6, -3]) (3D cross product)

// Rotate around axes
const rotatedX = v1.rotateX(Math.PI / 4);
const rotatedY = v1.rotateY(Math.PI / 2);
const rotatedZ = v1.rotateZ(PI);

// Spherical coordinates
const sphere = Vector3.fromSpherical(Math.PI / 4, Math.PI / 3, 2);
```

### Matrices

```typescript
import { Matrix } from '@rgsoft/linear';

// Create matrix
const m = new Matrix(3, 3, [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]);

// Operations
console.log(m.at(0, 1));       // 2 (element at row 0, col 1)
console.log(m.det);            // 0 (determinant)
console.log(m.inverse());      // Inverse matrix

// Transform
const scaled = m.scaleRow(1, 2);    // Scale row 1 by 2
const swapped = m.swapRows(0, 1);   // Swap rows

// Identity matrix
const I = Matrix.identity(3);
```

## Key Features

### Vectors

- **N-Dimensional Support** — Generic `Vector` class for any dimension
- **Optimized 2D/3D** — Specialized `Vector2` and `Vector3` classes with extra methods
- **Rich Operations** — Add, subtract, multiply, dot product, cross product, normalize, etc.
- **Geometric Utilities** — Angles, distances, projections, rotations
- **Immutable Design** — Operations return new instances, original unchanged

### Matrices

- **Flexible Dimensions** — Create matrices of any size
- **Row Operations** — Scale, swap, and combine rows for Gaussian elimination
- **Determinant & Inverse** — Compute determinant and matrix inverse
- **Caching** — Determinant results cached for performance
- **Immutable Design** — All operations return new matrices

## Use Cases

### Graphics & Game Development
```typescript
// Transform 3D models
const position = new Vector3([0, 0, 5]);
const rotated = position.rotateY(Math.PI / 4);

// 2D sprite rotation
const direction = new Vector2([1, 0]);
const rotated = direction.rotate(angle);
```

### Physics Simulations
```typescript
// Velocity and acceleration
const velocity = new Vector3([1, 0, 0]);
const acceleration = new Vector3([0, -9.8, 0]);
const newVelocity = velocity.add(acceleration);

// Check if moving in direction
const angle = velocity.angleTo(targetDirection);
```

### Coordinate Transformations
```typescript
// Convert to polar coordinates
const v = new Vector2([3, 4]);
console.log(v.angle);  // Angle in radians

// Normalize direction
const direction = v.normalize();
```

### Linear System Solving
```typescript
// Use matrix operations for solving Ax = b
const A = new Matrix(3, 3, [[1, 2, 3], [4, 5, 6], [7, 8, 10]]);
const reduced = A.reduce();
```

## Vector Constants

Pre-defined unit and zero vectors for common use:

```typescript
import { V2_ZERO, V2_UNIT_X, V2_UNIT_Y, V3_ZERO, V3_UNIT_X, V3_UNIT_Y, V3_UNIT_Z } from '@rgsoft/linear';

V2_ZERO;      // Vector2([0, 0])
V2_UNIT_X;    // Vector2([1, 0])
V2_UNIT_Y;    // Vector2([0, 1])

V3_ZERO;      // Vector3([0, 0, 0])
V3_UNIT_X;    // Vector3([1, 0, 0])
V3_UNIT_Y;    // Vector3([0, 1, 0])
V3_UNIT_Z;    // Vector3([0, 0, 1])
```

## Performance Considerations

- **Magnitude Caching** — Vector magnitude is cached after first calculation
- **Zero Vector Caching** — Zero vectors are cached and reused
- **Determinant Caching** — Matrix determinants are cached
- **Immutable Operations** — Safe for concurrent use, no side effects
- **Suitable for Real-Time** — Optimized for high-frequency updates in games and animations

## Integration with Other Packages

The linear library integrates well with other rgsoft packages:

- **@rgsoft/geometry** — Uses Vector2 and Vector3 for shapes and transformations
- **@rgsoft/math** — Uses math constants like EPSILON and PI
- **@rgsoft/graph** — Can represent graph nodes as vectors
