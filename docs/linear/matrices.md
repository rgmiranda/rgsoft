# Matrices Guide

Complete reference for matrix operations and transformations.

## Matrix Class Overview

The `Matrix` class provides a flexible, immutable interface for working with rectangular matrices of any size.

### Constructor

```typescript
constructor(rows: number, cols: number, values?: number[][])
```

Creates a matrix with given dimensions. If `values` is provided, initializes with those values; otherwise creates a zero matrix.

```typescript
// Empty 3x3 zero matrix
const m1 = new Matrix(3, 3);

// Initialize with values
const m2 = new Matrix(2, 3, [
  [1, 2, 3],
  [4, 5, 6]
]);
```

**Throws:** If dimensions are not positive integers or values don't match dimensions.

### Properties

- **`rows: number`** — Number of rows (immutable)
- **`cols: number`** — Number of columns (immutable)
- **`data: number[][]`** — 2D array of matrix values (returns a copy)
- **`det: number`** — The determinant (only for square matrices, cached after first calculation)

### Static Methods

#### `Matrix.identity(size: number): Matrix`

Creates a square identity matrix of the given size.

```typescript
const I = Matrix.identity(3);
// [[1, 0, 0],
//  [0, 1, 0],
//  [0, 0, 1]]
```

The identity matrix, when multiplied by any matrix A, returns A.

---

## Accessing Elements

### `at(i: number, j: number): number`

Returns the element at row i, column j (0-based indexing).

```typescript
const m = new Matrix(2, 2, [[1, 2], [3, 4]]);
console.log(m.at(0, 1));  // 2
console.log(m.at(1, 0));  // 3
```

**Throws:** If indices are out of bounds.

### `rowAt(i: number): number[]`

Returns a copy of the row at index i.

```typescript
const m = new Matrix(2, 3, [[1, 2, 3], [4, 5, 6]]);
console.log(m.rowAt(0));  // [1, 2, 3]
```

### `columnAt(j: number): number[]`

Returns a copy of the column at index j.

```typescript
const m = new Matrix(2, 3, [[1, 2, 3], [4, 5, 6]]);
console.log(m.columnAt(1));  // [2, 5]
```

---

## Setting Elements & Rows/Columns

All set operations return a new matrix (immutable design).

### `set(value: number, i: number, j: number): Matrix`

Returns a new matrix with the element at (i, j) set to value.

```typescript
const m = new Matrix(2, 2, [[1, 2], [3, 4]]);
const m2 = m.set(10, 0, 1);
// Returns [[1, 10], [3, 4]]
```

### `setRow(rowData: number[], i: number): Matrix`

Returns a new matrix with row i replaced.

```typescript
const m = new Matrix(2, 2, [[1, 2], [3, 4]]);
const m2 = m.setRow([5, 6], 0);
// Returns [[5, 6], [3, 4]]
```

### `setColumn(columnData: number[], j: number): Matrix`

Returns a new matrix with column j replaced.

```typescript
const m = new Matrix(2, 2, [[1, 2], [3, 4]]);
const m2 = m.setColumn([7, 8], 0);
// Returns [[7, 2], [8, 4]]
```

---

## Row Operations

These are fundamental operations for Gaussian elimination and solving linear systems.

### `scaleRow(i: number, scalar: number): Matrix`

Multiplies row i by a scalar value.

```typescript
const m = new Matrix(2, 2, [[1, 2], [3, 4]]);
const scaled = m.scaleRow(0, 2);
// Returns [[2, 4], [3, 4]]
```

**Use case:** Normalize row for Gaussian elimination.

### `swapRows(i: number, j: number): Matrix`

Swaps two rows.

```typescript
const m = new Matrix(3, 3, [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]);
const swapped = m.swapRows(0, 2);
// Returns [[7, 8, 9], [4, 5, 6], [1, 2, 3]]
```

**Use case:** Pivot selection in Gaussian elimination.

### `addScaledRow(sourceRow: number, targetRow: number, scalar?: number): Matrix`

Adds `scalar` times `sourceRow` to `targetRow`.

```typescript
const m = new Matrix(2, 2, [[1, 2], [3, 4]]);
const result = m.addScaledRow(0, 1, -3);
// Adds -3 * row 0 to row 1
// Returns [[1, 2], [0, -2]]
```

**Use case:** Eliminate coefficients in Gaussian elimination.

---

## Matrix Analysis

### `det: number`

The determinant of a square matrix.

```typescript
const m = new Matrix(2, 2, [[1, 2], [3, 4]]);
console.log(m.det);  // -2

const singular = new Matrix(2, 2, [[1, 2], [2, 4]]);
console.log(singular.det);  // 0 (singular, non-invertible)
```

**Throws:** If matrix is not square.

**Performance:** O(n³) for n×n matrix. Result is cached.

### `inverse(): Matrix`

Returns the inverse matrix (A⁻¹ such that A × A⁻¹ = I).

```typescript
const m = new Matrix(2, 2, [[1, 2], [3, 4]]);
const inv = m.inverse();
const identity = m.mult(inv);  // ~I
```

**Throws:** If matrix is not square or is singular (determinant = 0).

### `transpose(): Matrix`

Returns the transpose (rows become columns).

```typescript
const m = new Matrix(2, 3, [[1, 2, 3], [4, 5, 6]]);
const t = m.transpose();
// Returns [[1, 4], [2, 5], [3, 6]] (3x2)
```

---

## Matrix Operations

### `mult(other: Matrix): Matrix`

Multiplies this matrix by another matrix.

```typescript
const m1 = new Matrix(2, 3, [[1, 2, 3], [4, 5, 6]]);
const m2 = new Matrix(3, 2, [[7, 8], [9, 10], [11, 12]]);
const result = m1.mult(m2);
// Returns a 2x2 matrix
```

**Throws:** If the number of columns in this matrix ≠ number of rows in other.

### `multVector(v: Vector): Vector`

Multiplies the matrix by a vector.

```typescript
const m = new Matrix(2, 2, [[1, 2], [3, 4]]);
const v = new Vector([5, 6]);
const result = m.multVector(v);
// Returns Vector([17, 39])
```

**Throws:** If matrix columns ≠ vector dimension.

---

## Matrix Transformations

### `reduce(): Matrix`

Reduces the matrix to row echelon form using Gaussian elimination.

```typescript
const m = new Matrix(3, 4, [
  [1, 2, 3, 4],
  [2, 4, 6, 8],
  [1, 1, 1, 1]
]);
const reduced = m.reduce();
// Returns matrix in row echelon form
```

**Use case:** Solving linear systems, finding rank.

---

## Common Patterns

### Solving Linear Systems (Ax = b)

```typescript
import { Matrix } from '@rgsoft/linear';
import { Vector } from '@rgsoft/linear';

// System: x + 2y = 5, 3x + 4y = 11
const A = new Matrix(2, 2, [[1, 2], [3, 4]]);
const b = new Vector([5, 11]);

// Solve using inverse
const Ainv = A.inverse();
const x = Ainv.multVector(b);
console.log(x.values);  // [1, 2]
```

### Affine Transformations (2D)

```typescript
// Translation: move by (3, 4)
const translate = new Matrix(3, 3, [
  [1, 0, 3],
  [0, 1, 4],
  [0, 0, 1]
]);

// Rotation: 45 degrees
const cos45 = Math.cos(Math.PI / 4);
const sin45 = Math.sin(Math.PI / 4);
const rotate = new Matrix(3, 3, [
  [cos45, -sin45, 0],
  [sin45, cos45, 0],
  [0, 0, 1]
]);

// Scaling: 2x in x, 0.5x in y
const scale = new Matrix(3, 3, [
  [2, 0, 0],
  [0, 0.5, 0],
  [0, 0, 1]
]);

// Combine transformations
const combined = scale.mult(rotate).mult(translate);
```

### Finding Matrix Rank

```typescript
const m = new Matrix(3, 4, [
  [1, 2, 3, 4],
  [2, 4, 6, 8],
  [1, 1, 1, 1]
]);

const reduced = m.reduce();
// Count non-zero rows to get rank
```

### 3D Perspective Projection

```typescript
// Simple perspective projection matrix
// Projects 3D coordinates to 2D screen
const FOV = Math.PI / 4;
const aspect = 16 / 9;
const near = 0.1;
const far = 100;

const f = 1 / Math.tan(FOV / 2);
const projection = new Matrix(4, 4, [
  [f / aspect, 0, 0, 0],
  [0, f, 0, 0],
  [0, 0, (far + near) / (near - far), -1],
  [0, 0, (2 * far * near) / (near - far), 0]
]);
```

---

## Advanced Operations

### LU Decomposition

```typescript
// Manually perform LU decomposition via row operations
const A = new Matrix(3, 3, [
  [2, 3, 1],
  [4, 1, -1],
  [6, -1, 0]
]);

// Forward elimination
let U = A;
for (let i = 0; i < U.rows - 1; i++) {
  for (let j = i + 1; j < U.rows; j++) {
    const factor = U.at(j, i) / U.at(i, i);
    U = U.addScaledRow(i, j, -factor);
  }
}

// U is now upper triangular
```

### Matrix Decomposition and Analysis

```typescript
// Check if matrix is singular
const m = new Matrix(2, 2, [[1, 2], [2, 4]]);
if (m.det === 0) {
  console.log('Matrix is singular (non-invertible)');
}

// Check if matrix is orthogonal (A^T * A = I)
const A = new Matrix(2, 2, [[1, 0], [0, 1]]);
const AT = A.transpose();
const product = AT.mult(A);
// Check if product equals identity
```

---

## Performance Considerations

- **Determinant Caching** — Computed determinants are cached for square matrices
- **Immutable Design** — All operations create new matrices; original unchanged
- **Row Operations** — O(n²) for n×n matrices
- **Determinant** — O(n³) using Gaussian elimination
- **Matrix Multiplication** — O(n³) using naive algorithm
- **Use Reference Copies** — Get `data` property returns a copy; modify with care

## Integration with Vectors

Matrices work seamlessly with vectors for transformations:

```typescript
import { Matrix, Vector3 } from '@rgsoft/linear';

const transform = new Matrix(4, 4, [
  [1, 0, 0, 5],
  [0, 1, 0, 3],
  [0, 0, 1, -2],
  [0, 0, 0, 1]
]);

// Note: Extend vector to homogeneous coordinates for 3D transforms
const v = new Vector([1, 2, 3, 1]);
const transformed = transform.multVector(v);
```
