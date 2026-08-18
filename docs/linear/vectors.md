# Vectors Guide

Complete reference for vector operations in 2D, 3D, and n-dimensional space.

## Vector Base Class

The generic `Vector` class provides the foundation for all vector operations.

### Constructor

```typescript
constructor(values: number[])
```

Creates a vector with the given values.

```typescript
const v = new Vector([1, 2, 3, 4]);  // 4D vector
```

### Properties

- **`dim: number`** — The number of dimensions in the vector
- **`mag: number`** — The magnitude (length) of the vector. Cached after first calculation.
- **`isZero: boolean`** — True if the vector is a zero vector (all components are ~0)
- **`values: number[]`** — Array of vector components

### Static Methods

- **`Vector.getZero(dim: number): Vector`** — Returns the cached zero vector for a given dimension
- **`Vector.getZero(3)`** — Returns the zero vector [0, 0, 0]

### Instance Methods

#### `at(index: number): number`

Returns the component at the given index.

```typescript
const v = new Vector([1, 2, 3]);
console.log(v.at(0));  // 1
console.log(v.at(2));  // 3
```

#### `normalize(): this`

Returns a unit vector in the same direction (magnitude = 1).

```typescript
const v = new Vector([3, 4]);
const unit = v.normalize();  // Vector([0.6, 0.8])
console.log(unit.mag);       // 1
```

#### `mult(scalar: number): this`

Multiplies each component by a scalar.

```typescript
const v = new Vector([1, 2, 3]);
const scaled = v.mult(2);  // Vector([2, 4, 6])
```

#### `div(scalar: number): this`

Divides each component by a scalar.

```typescript
const v = new Vector([2, 4, 6]);
const divided = v.div(2);  // Vector([1, 2, 3])
```

#### `add(v: Vector): this`

Adds two vectors component-wise.

```typescript
const v1 = new Vector([1, 2, 3]);
const v2 = new Vector([4, 5, 6]);
const sum = v1.add(v2);  // Vector([5, 7, 9])
```

**Throws:** If vectors have different dimensions.

#### `sub(v: Vector): this`

Subtracts another vector component-wise.

```typescript
const v1 = new Vector([4, 5, 6]);
const v2 = new Vector([1, 2, 3]);
const diff = v1.sub(v2);  // Vector([3, 3, 3])
```

**Throws:** If vectors have different dimensions.

#### `dot(v: Vector): number`

Computes the dot product (scalar product).

```typescript
const v1 = new Vector([1, 2, 3]);
const v2 = new Vector([4, 5, 6]);
const dot = v1.dot(v2);  // 1*4 + 2*5 + 3*6 = 32
```

**Throws:** If vectors have different dimensions.

#### `dist(v: Vector): number`

Computes the Euclidean distance to another vector.

```typescript
const v1 = new Vector([0, 0, 0]);
const v2 = new Vector([3, 4, 0]);
const distance = v1.dist(v2);  // 5
```

**Throws:** If vectors have different dimensions.

#### `equals(v: Vector, epsilon?: number): boolean`

Checks if two vectors are equal within a tolerance.

```typescript
const v1 = new Vector([1, 2, 3]);
const v2 = new Vector([1.0000001, 2, 3]);
console.log(v1.equals(v2));  // true (within EPSILON)
```

#### `projection(onto: Vector): this`

Projects this vector onto another vector.

```typescript
const v = new Vector([3, 4]);
const onto = new Vector([1, 0]);
const proj = v.projection(onto);  // Vector([3, 0])
```

Returns the component of this vector in the direction of `onto`.

#### `angleTo(v: Vector): number`

Computes the angle (in radians) between two vectors.

```typescript
const v1 = new Vector([1, 0]);
const v2 = new Vector([0, 1]);
const angle = v1.angleTo(v2);  // Math.PI / 2 (90 degrees)
```

**Throws:** If either vector is zero.

#### `limit(magnitude: number): this`

Returns a new vector with magnitude capped at the given value.

```typescript
const v = new Vector([3, 4]);
const limited = v.limit(2);  // Vector with magnitude 2, direction preserved
```

#### `clone(): this`

Creates a deep copy of the vector.

```typescript
const v1 = new Vector([1, 2, 3]);
const v2 = v1.clone();
// v2 is a new instance with same values
```

---

## Vector2 Class

Specialized 2D vector with rotation and 2D-specific operations.

### Constructor

```typescript
constructor(values: [number, number])
```

```typescript
const v = new Vector2([3, 4]);
```

### Properties

Inherits all `Vector` properties, plus:

- **`x: number`** — The X component
- **`y: number`** — The Y component
- **`angle: number`** — The angle in radians from the positive X axis (using `Math.atan2`)

### Static Methods

#### `Vector2.getZero(): Vector2`

Returns the zero vector [0, 0].

#### `Vector2.fromAngle(angle: number, radius?: number): Vector2`

Creates a vector from an angle and optional radius.

```typescript
const v = Vector2.fromAngle(Math.PI / 4, 5);  // 45 degrees, magnitude 5
```

### Instance Methods

All inherited from `Vector`, plus:

#### `rotate(angle: number): Vector2`

Rotates the vector by the given angle (in radians).

```typescript
const v = new Vector2([1, 0]);
const rotated = v.rotate(Math.PI / 2);  // ~Vector2([0, 1])
```

Optimized for special angles (0, π/2, -π/2, π).

#### `cross(v: Vector2): number`

Computes the 2D cross product (scalar result).

```typescript
const v1 = new Vector2([1, 0]);
const v2 = new Vector2([0, 1]);
const cross = v1.cross(v2);  // 1 (magnitude of 3D cross product z-component)
```

### Example: 2D Transformations

```typescript
import { Vector2 } from '@rgsoft/linear';

// Create position and direction vectors
const position = new Vector2([10, 20]);
const direction = new Vector2([1, 0]);

// Rotate direction 45 degrees
const rotatedDir = direction.rotate(Math.PI / 4);

// Scale direction
const velocity = rotatedDir.mult(5);

// Update position
const newPosition = position.add(velocity);

// Check distance traveled
const distance = position.dist(newPosition);
```

---

## Vector3 Class

Specialized 3D vector with rotation and spherical coordinate support.

### Constructor

```typescript
constructor(values: [number, number, number])
```

```typescript
const v = new Vector3([1, 2, 3]);
```

### Properties

Inherits all `Vector` properties, plus:

- **`x: number`** — The X component
- **`y: number`** — The Y component
- **`z: number`** — The Z component
- **`azimuth: number`** — The azimuthal angle (angle in XY plane) in radians
- **`polar: number`** — The polar angle (from Z axis) in radians

### Static Methods

#### `Vector3.getZero(): Vector3`

Returns the zero vector [0, 0, 0].

#### `Vector3.fromSpherical(theta: number, phi: number, r?: number): Vector3`

Creates a vector from spherical coordinates.

**Parameters:**
- `theta` — Polar angle from positive Z axis (in radians)
- `phi` — Azimuthal angle from positive X axis in XY plane (in radians)
- `r` — Magnitude/radius (default: 1)

```typescript
// Create a point on a sphere
const point = Vector3.fromSpherical(Math.PI / 4, Math.PI / 3, 2);
```

### Instance Methods

All inherited from `Vector`, plus:

#### `rotateX(angle: number): Vector3`

Rotates the vector around the X axis.

```typescript
const v = new Vector3([0, 1, 0]);
const rotated = v.rotateX(Math.PI / 2);  // ~Vector3([0, 0, 1])
```

#### `rotateY(angle: number): Vector3`

Rotates the vector around the Y axis.

```typescript
const v = new Vector3([1, 0, 0]);
const rotated = v.rotateY(Math.PI / 2);  // ~Vector3([0, 0, -1])
```

#### `rotateZ(angle: number): Vector3`

Rotates the vector around the Z axis.

```typescript
const v = new Vector3([1, 0, 0]);
const rotated = v.rotateZ(Math.PI / 2);  // ~Vector3([0, 1, 0])
```

#### `cross(v: Vector3): Vector3`

Computes the 3D cross product.

```typescript
const v1 = new Vector3([1, 0, 0]);
const v2 = new Vector3([0, 1, 0]);
const cross = v1.cross(v2);  // Vector3([0, 0, 1])
```

The cross product is perpendicular to both input vectors.

### Example: 3D Transformations

```typescript
import { Vector3 } from '@rgsoft/linear';
import { PI } from '@rgsoft/math';

// Create position and direction
const position = new Vector3([0, 0, 5]);
const direction = new Vector3([1, 0, 0]);

// Rotate around Y axis 45 degrees
const rotatedDir = direction.rotateY(Math.PI / 4);

// Create velocity
const velocity = rotatedDir.mult(2);

// Update position
const newPosition = position.add(velocity);

// Get distance
const distance = position.dist(newPosition);

// Check if moving up
const upVector = new Vector3([0, 1, 0]);
const angle = velocity.angleTo(upVector);
```

---

## Vector Utilities

### Getting Orientation

Use the `getOrientation` function to determine the orientation of three points.

```typescript
import { getOrientation } from '@rgsoft/linear';
import { Vector2 } from '@rgsoft/linear';

const p = new Vector2([0, 0]);
const q = new Vector2([1, 1]);
const r = new Vector2([2, 0]);

const orientation = getOrientation(p, q, r);
// Returns: 0 = collinear, -1 = clockwise, 1 = counterclockwise
```

### Vector Constants

```typescript
import {
  V2_ZERO, V2_UNIT_X, V2_UNIT_Y,
  V3_ZERO, V3_UNIT_X, V3_UNIT_Y, V3_UNIT_Z
} from '@rgsoft/linear';

// Use for quick reference to common vectors
const right = V2_UNIT_X;      // [1, 0]
const up = V2_UNIT_Y;         // [0, 1]
const forward = V3_UNIT_Z;    // [0, 0, 1]
```

## Common Patterns

### Normalize a Direction

```typescript
const v = new Vector2([3, 4]);
const direction = v.normalize();  // Unit vector in same direction
const scaled = direction.mult(10);  // 10 units in that direction
```

### Linear Interpolation

```typescript
const start = new Vector3([0, 0, 0]);
const end = new Vector3([10, 10, 10]);

function lerp(from: Vector3, to: Vector3, t: number): Vector3 {
  return from.add(to.sub(from).mult(t));
}

const midpoint = lerp(start, end, 0.5);
```

### Calculate Velocity from Positions

```typescript
const prev = new Vector2([0, 0]);
const curr = new Vector2([5, 5]);
const deltaTime = 0.016;  // 60 FPS

const velocity = curr.sub(prev).div(deltaTime);
```

### Project Point onto Line

```typescript
// Line defined by point P and direction D
const P = new Vector2([0, 0]);
const D = new Vector2([1, 0]).normalize();

// Point to project
const Q = new Vector2([5, 5]);

// Vector from P to Q
const PQ = Q.sub(P);

// Project PQ onto D
const projection = PQ.projection(D);

// Projected point
const closest = P.add(projection);
```

### Rotate Around Point

```typescript
const center = new Vector2([5, 5]);
const point = new Vector2([10, 5]);

// Translate to origin
const relative = point.sub(center);

// Rotate
const rotated = relative.rotate(Math.PI / 4);

// Translate back
const result = rotated.add(center);
```
