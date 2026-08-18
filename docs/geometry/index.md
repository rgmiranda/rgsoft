# Geometry Library

The geometry library provides a comprehensive collection of 2D and 3D geometric primitives and algorithms for computational geometry. It offers classes for working with points, lines, planes, segments, and polygonal shapes with built-in intersection and containment detection.

This package is designed for graphics applications, spatial algorithms, computational geometry, game development, and physics simulations that require robust geometric operations.

## Contents

- [Areas & Shapes](areas.md) — Work with 2D areas including circles, rectangles, polygons, and triangles with containment and intersection testing.
- [Lines & Segments](lines.md) — Represent and manipulate 2D lines, 3D lines, and line segments with properties like direction, normal, and slope.
- [Planes](planes.md) — Work with 3D planes, including plane-point distances and plane creation from points and normals.

## Quick Start

```typescript
import { Circle, Rect, Segment2, Line2, Triangle } from '@rgsoft/geometry';
import { Vector2, Vector3 } from '@rgsoft/linear';

// Create a circle
const circle = new Circle(new Vector2([0, 0]), 5);

// Check if a point is inside
const point = new Vector2([3, 4]);
console.log(circle.contains(point)); // true

// Create a rectangle
const rect = new Rect(new Vector2([0, 0]), 10, 10);

// Check intersection
console.log(circle.intersects(rect)); // true

// Create a line from two points
const line = Line2.fromPoints(
  new Vector2([0, 0]),
  new Vector2([10, 10])
);
console.log(line.slope); // 1

// Create a triangle from three points
const triangle = new Triangle(
  new Vector2([0, 0]),
  new Vector2([10, 0]),
  new Vector2([5, 10])
);
console.log(triangle.centroid); // center point of triangle
```

## Highlights

The library provides:

- **2D Area Interface** — Unified interface for geometric shapes with `contains()` and `intersects()` methods
- **Shape Classes** — `Circle`, `Rect`, `Polygon`, and `Triangle` with specialized intersection tests
- **Line Representations** — `Line2` and `Line3` with computation of slopes, intercepts, and distance to points
- **Segment Operations** — `Segment2` for line segments with length, midpoint, and intersection detection
- **3D Support** — `Line3` and `Plane` classes for 3D geometric operations
- **Spatial Queries** — Built-in methods for containment testing, intersection detection, and geometric computations
