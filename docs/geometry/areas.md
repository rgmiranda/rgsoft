# Areas & Shapes

The geometry library provides a unified interface for 2D areas through the `Area` interface, with multiple implementations for different shape types. All area shapes support containment testing and mutual intersection detection.

## Area Interface

The `Area` interface defines the core contract for all 2D geometric shapes:

```typescript
interface Area {
  contains(p: Vector2): boolean;
  intersects(area: Area): boolean;
  intersectsCircle(area: Circle): boolean;
  intersectsRect(area: Rect): boolean;
  intersectsPolygon(area: Polygon): boolean;
}
```

### Methods

- **`contains(p: Vector2): boolean`** — Returns true if the point p is inside or on the boundary of the shape.
- **`intersects(area: Area): boolean`** — Checks if this shape intersects with another area.
- **`intersectsCircle(area: Circle): boolean`** — Specialized intersection test with a circle.
- **`intersectsRect(area: Rect): boolean`** — Specialized intersection test with a rectangle.
- **`intersectsPolygon(area: Polygon): boolean`** — Specialized intersection test with a polygon.

## Circle

A circle is defined by a center point and a radius.

```typescript
import { Circle } from '@rgsoft/geometry';
import { Vector2 } from '@rgsoft/linear';

const circle = new Circle(
  new Vector2([0, 0]),  // center
  5                      // radius
);
```

### Properties

- **`c: Vector2`** — The center point of the circle.
- **`r: number`** — The radius of the circle.
- **`squaredRadius: number`** — The squared radius (r²), useful for distance calculations without square roots.

### Methods

- **`contains(p: Vector2): boolean`** — Tests if point p is inside the circle using squared distance to avoid expensive square root operations.
- **`intersects(area: Area): boolean`** — Generic intersection test.
- **`intersectsCircle(area: Circle): boolean`** — Detects circle-circle collision.
- **`intersectsRect(area: Rect): boolean`** — Detects circle-rectangle collision using closest point on rectangle.
- **`intersectsPolygon(area: Polygon): boolean`** — Detects circle-polygon collision by checking vertices and edges.

### Example

```typescript
const circle1 = new Circle(new Vector2([0, 0]), 5);
const circle2 = new Circle(new Vector2([3, 4]), 3);

console.log(circle1.contains(new Vector2([2, 2]))); // likely true
console.log(circle1.intersects(circle2));          // likely true
```

## Rectangle

A rectangle is defined by an origin point, width, and height. Rectangles are axis-aligned and extend from the origin.

```typescript
import { Rect } from '@rgsoft/geometry';
import { Vector2 } from '@rgsoft/linear';

const rect = new Rect(
  new Vector2([0, 0]),  // origin (top-left)
  10,                    // width
  8                      // height
);
```

### Properties

- **`o: Vector2`** — The origin point (top-left corner) of the rectangle.
- **`w: number`** — The width of the rectangle.
- **`h: number`** — The height of the rectangle.
- **`vertex: Vector2[]`** — Array of the four corner vertices (inherited from `Polygon`).
- **`sides: Segment2[]`** — Array of the four edges as `Segment2` objects (inherited from `Polygon`).

### Methods

- **`contains(p: Vector2): boolean`** — Efficient axis-aligned containment test.
- **`intersects(area: Area): boolean`** — Generic intersection test.
- **`intersectsRect(area: Rect): boolean`** — AABB intersection test.
- **`intersectsCircle(area: Circle): boolean`** — Uses closest point on rectangle to circle center.
- **`intersectsPolygon(area: Polygon): boolean`** — Inherits from `Polygon`.

### Example

```typescript
const rect = new Rect(new Vector2([0, 0]), 20, 15);

console.log(rect.contains(new Vector2([5, 5])));    // true
console.log(rect.contains(new Vector2([25, 5])));   // false

const circle = new Circle(new Vector2([20, 7.5]), 5);
console.log(rect.intersects(circle));               // true
```

## Polygon

A polygon is defined by an array of vertices. Polygons must have at least 3 vertices and automatically compute sides connecting consecutive vertices.

```typescript
import { Polygon } from '@rgsoft/geometry';
import { Vector2 } from '@rgsoft/linear';

const polygon = new Polygon([
  new Vector2([0, 0]),
  new Vector2([10, 0]),
  new Vector2([10, 10]),
  new Vector2([0, 10])
]);
```

### Properties

- **`vertex: Vector2[]`** — Array of vertices defining the polygon.
- **`sides: Segment2[]`** — Array of segments connecting consecutive vertices.

### Methods

- **`contains(p: Vector2): boolean`** — Uses ray casting algorithm for point-in-polygon test. Points on edges are considered inside.
- **`centroid: Vector2`** — Computed property that returns the geometric center of the polygon.
- **`intersects(area: Area): boolean`** — Generic intersection test.
- **`intersectsCircle(area: Circle): boolean`** — Polygon-circle intersection using edge distances.
- **`intersectsRect(area: Rect): boolean`** — Segment-segment intersection tests for all sides.
- **`intersectsPolygon(area: Polygon): boolean`** — Segment-segment intersection tests between all sides.

### Example

```typescript
const triangle = new Polygon([
  new Vector2([0, 0]),
  new Vector2([10, 0]),
  new Vector2([5, 10])
]);

console.log(triangle.contains(new Vector2([5, 5])));  // true
console.log(triangle.centroid);                        // Vector2([5, 3.33...])
```

## Triangle

A specialized polygon for triangles with three vertices. Triangles automatically compute their circumcircle (circumscribed circle).

```typescript
import { Triangle } from '@rgsoft/geometry';
import { Vector2 } from '@rgsoft/linear';

const triangle = new Triangle(
  new Vector2([0, 0]),
  new Vector2([10, 0]),
  new Vector2([5, 10])
);
```

### Properties

- **`a: Vector2`** — First vertex.
- **`b: Vector2`** — Second vertex.
- **`c: Vector2`** — Third vertex.
- **`center: Vector2`** — The circumcenter (center of circumscribed circle).
- **`radius: number`** — The circumradius (radius of circumscribed circle).
- **`vertex: Vector2[]`** — All three vertices (inherited from `Polygon`).
- **`sides: Segment2[]`** — The three edges (inherited from `Polygon`).

### Methods

- **`inCircle(point: Vector2): boolean`** — Tests if a point is strictly inside the circumcircle.
- **`hasEdge(a: Vector2, b: Vector2): boolean`** — Tests if the triangle has an edge between two points.
- **`contains(p: Vector2): boolean`** — Inherits from `Polygon`.
- **`intersects(area: Area): boolean`** — Inherits from `Polygon`.

### Example

```typescript
const triangle = new Triangle(
  new Vector2([0, 0]),
  new Vector2([8, 0]),
  new Vector2([4, 6])
);

console.log(triangle.center);                        // circumcenter
console.log(triangle.inCircle(triangle.center));     // true
console.log(triangle.hasEdge(
  new Vector2([0, 0]),
  new Vector2([8, 0])
));                                                   // true
```

## Working with Areas

All shapes implementing the `Area` interface can be used polymorphically:

```typescript
const shapes: Area[] = [
  new Circle(new Vector2([0, 0]), 5),
  new Rect(new Vector2([10, 10]), 8, 6),
  new Triangle(new Vector2([20, 0]), new Vector2([30, 0]), new Vector2([25, 10]))
];

const testPoint = new Vector2([15, 12]);
for (const shape of shapes) {
  if (shape.contains(testPoint)) {
    console.log('Point is in shape!');
  }
}
```

The polymorphic `intersects()` method automatically dispatches to the appropriate specialized intersection method based on the type being tested.
