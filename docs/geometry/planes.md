# Planes

The geometry library provides a `Plane` class for working with 3D planes, including plane creation, point-plane distance calculations, and line-plane intersections.

## Overview

A plane in 3D space is represented by a normal vector and a distance scalar in the implicit equation: `n·x + d = 0`, where `n` is the unit normal and `x` is a point on the plane.

```typescript
import { Plane } from '@rgsoft/geometry';
import { Vector3 } from '@rgsoft/linear';

const plane = new Plane(
  new Vector3([0, 1, 0]),  // normal vector
  0                         // distance scalar d
);
```

## Construction

### Direct Construction

```typescript
const plane = new Plane(normal, d);
```

The normal vector is automatically normalized.

### From Point and Normal

```typescript
const plane = Plane.fromPointNormal(
  new Vector3([0, 5, 0]),    // point on plane
  new Vector3([0, 1, 0])     // normal vector
);
```

This is useful when you know a point on the plane and want it perpendicular to a given direction.

### From Three Points

```typescript
const plane = Plane.fromPoints(
  new Vector3([0, 0, 0]),    // first point
  new Vector3([1, 0, 0]),    // second point
  new Vector3([0, 1, 0])     // third point
);
```

Creates a plane from three non-collinear points. The points define the plane uniquely, and the normal is computed using the cross product.

## Properties

- **`normal: Vector3`** — The unit normal vector to the plane (always normalized).
- **`d: number`** — The distance scalar in the implicit equation n·x + d = 0.

## Methods

### Distance Calculations

- **`distanceToPoint(point: Vector3): number`** — Computes the signed distance from a point to the plane.
  - Positive distance: point is on the side the normal points to
  - Negative distance: point is on the opposite side
  - Zero distance: point is on the plane

### Intersection

- **`intersectionWithLine(line: Line3): Vector3`** — Finds the intersection point where a line crosses the plane. Throws if line is parallel to the plane.

## Examples

### Finding Distance to Plane

```typescript
const plane = Plane.fromPoints(
  new Vector3([0, 0, 0]),
  new Vector3([1, 0, 0]),
  new Vector3([0, 1, 0])
);

// Plane is perpendicular to z-axis at z=0 (the xy-plane)
console.log(plane.normal);                           // Vector3([0, 0, 1])

const point = new Vector3([5, 5, 3]);
console.log(plane.distanceToPoint(point));           // 3 (above plane)

const pointBelow = new Vector3([5, 5, -2]);
console.log(plane.distanceToPoint(pointBelow));      // -2 (below plane)
```

### Creating Planes from Geometry

```typescript
// Create a plane from a point and normal direction
const floor = Plane.fromPointNormal(
  new Vector3([0, 0, 0]),
  new Vector3([0, 1, 0])  // normal points up
);

// Test if objects are above or below
const ball = new Vector3([5, 10, 3]);
console.log(floor.distanceToPoint(ball) > 0);       // true (ball is above)

// Create a vertical plane
const wall = Plane.fromPoints(
  new Vector3([0, 0, 0]),
  new Vector3([10, 0, 0]),
  new Vector3([10, 10, 0])
);

console.log(wall.normal);                            // Vector3([0, 0, 1]) or opposite
```

### Line-Plane Intersection

```typescript
import { Line3, Plane } from '@rgsoft/geometry';
import { Vector3 } from '@rgsoft/linear';

// Create a plane (xy-plane at z=0)
const plane = new Plane(new Vector3([0, 0, 1]), 0);

// Create a line going from (5, 5, -10) to (5, 5, 10)
const line = new Line3(
  new Vector3([5, 5, -10]),
  new Vector3([0, 0, 1])
);

// Find intersection
const intersection = plane.intersectionWithLine(line);
console.log(intersection);                           // Vector3([5, 5, 0])
```

## Use Cases

Planes are useful for:

- **Clipping** — Determine which side of a plane an object is on
- **Collisions** — Detect intersection of moving objects with planar surfaces
- **Visibility** — Use planes as view frustum boundaries
- **Partitioning** — Use planes to divide 3D space (as in BSP trees)
- **Reflections** — Mirror points or rays across planes
- **Shadow Volumes** — Build shadow volumes from planes and light positions
