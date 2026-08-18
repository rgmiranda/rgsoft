# Geometry

A comprehensive 2D and 3D geometry library for computational geometry, graphics, and spatial algorithms.

## Installation

```sh
npm install @rgsoft/geometry
```

## Documentation

- [Main Documentation](../../docs/geometry/index.md) — Overview and quick start guide
- [Areas & Shapes](../../docs/geometry/areas.md) — Circles, rectangles, polygons, and triangles with intersection and containment testing
- [Lines & Segments](../../docs/geometry/lines.md) — 2D and 3D lines and line segments with geometric operations
- [Planes](../../docs/geometry/planes.md) — 3D plane representations and operations

## Quick Start

```typescript
import { Circle, Rect, Triangle } from '@rgsoft/geometry';
import { Vector2 } from '@rgsoft/linear';

// Create shapes
const circle = new Circle(new Vector2([0, 0]), 5);
const rect = new Rect(new Vector2([0, 0]), 10, 10);

// Test containment
const point = new Vector2([3, 4]);
console.log(circle.contains(point)); // true

// Test intersection
console.log(circle.intersects(rect)); // true

// Create a triangle
const triangle = new Triangle(
  new Vector2([0, 0]),
  new Vector2([10, 0]),
  new Vector2([5, 10])
);
console.log(triangle.centroid); // Vector2([5, 3.33...])
```

## Development

```sh
npm run build    # Build the package
npm run test     # Run tests
npm run coverage # Generate coverage report
```
