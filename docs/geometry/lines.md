# Lines & Segments

The geometry library provides representations for infinite lines and finite line segments in both 2D and 3D space, along with methods for geometric calculations like intersections, distances, and projections.

## 2D Lines (Line2)

A 2D line is defined by a point and a direction vector. Internally, lines are stored in implicit form (ax + by + c = 0) for efficient point testing.

```typescript
import { Line2 } from '@rgsoft/geometry';
import { Vector2 } from '@rgsoft/linear';

// Create from a point and direction
const line = new Line2(
  new Vector2([0, 0]),      // point on the line
  new Vector2([1, 1])       // direction vector
);

// Or create from two points
const line2 = Line2.fromPoints(
  new Vector2([0, 0]),
  new Vector2([10, 10])
);
```

### Properties

- **`point: Vector2`** — A point on the line.
- **`direction: Vector2`** — The normalized direction vector.
- **`normal: Vector2`** — The perpendicular normal vector (normalized).
- **`a: number`** — Coefficient a in implicit form ax + by + c = 0.
- **`b: number`** — Coefficient b in implicit form ax + by + c = 0.
- **`c: number`** — Coefficient c in implicit form ax + by + c = 0.

### Static Methods

- **`Line2.fromPoints(p: Vector2, q: Vector2): Line2`** — Creates a line from two points.
- **`Line2.mediatrix(p: Vector2, q: Vector2): Line2`** — Creates the perpendicular bisector of two points.

### Properties & Calculations

- **`slope: number`** — The slope of the line (rise over run). Returns `NaN` for vertical lines.
- **`yIntercept: number | null`** — The y-intercept (where line crosses y-axis). `null` for horizontal lines.
- **`xIntercept: number | null`** — The x-intercept (where line crosses x-axis). `null` for vertical lines.
- **`yInterceptPoint: Vector2 | null`** — The point where line crosses y-axis.
- **`xInterceptPoint: Vector2 | null`** — The point where line crosses x-axis.

### Methods

- **`containsPoint(p: Vector2, tolerance?: number): boolean`** — Tests if a point lies on the line within a tolerance.
- **`distanceToPoint(p: Vector2): number`** — Computes the perpendicular distance from a point to the line.
- **`projectPoint(p: Vector2): Vector2`** — Projects a point onto the line, returning the closest point on the line.
- **`intersectionPoint(line: Line2): Vector2`** — Finds the intersection point with another line. Throws if lines are parallel.
- **`toString(): string`** — Returns the implicit form string representation.

### Example

```typescript
const line = Line2.fromPoints(
  new Vector2([0, 0]),
  new Vector2([10, 0])
);

console.log(line.slope);                            // 0 (horizontal)
console.log(line.yIntercept);                       // 0
console.log(line.distanceToPoint(new Vector2([5, 10]))); // 10
console.log(line.projectPoint(new Vector2([5, 10]))); // Vector2([5, 0])

// Find intersection
const line2 = Line2.fromPoints(
  new Vector2([5, -10]),
  new Vector2([5, 10])
);
console.log(line.intersectionPoint(line2));        // Vector2([5, 0])
```

## 2D Line Segments (Segment2)

A line segment is defined by two endpoints. It differs from a line in that it is finite and bounded by its start and end points.

```typescript
import { Segment2 } from '@rgsoft/geometry';
import { Vector2 } from '@rgsoft/linear';

const segment = new Segment2(
  new Vector2([0, 0]),      // start point
  new Vector2([10, 10])     // end point
);
```

### Properties

- **`start: Vector2`** — The start point of the segment.
- **`end: Vector2`** — The end point of the segment.
- **`length: number`** — The length of the segment.
- **`midpoint: Vector2`** — The midpoint of the segment.
- **`direction: Vector2`** — The normalized direction vector from start to end.

### Methods

- **`contains(p: Vector2, tolerance?: number): boolean`** — Tests if a point lies on the segment (between endpoints).
- **`intersects(segment: Segment2): boolean`** — Detects intersection with another segment. Handles special cases like collinear and touching endpoints.
- **`distanceToPoint(p: Vector2): number`** — Computes the perpendicular distance from a point to the segment (or distance to nearest endpoint if perpendicular doesn't intersect segment).
- **`closestPointTo(p: Vector2): Vector2`** — Finds the closest point on the segment to the given point.
- **`toLine(): Line2`** — Converts the segment to an infinite line.

### Example

```typescript
const seg1 = new Segment2(
  new Vector2([0, 0]),
  new Vector2([10, 10])
);

const seg2 = new Segment2(
  new Vector2([0, 10]),
  new Vector2([10, 0])
);

console.log(seg1.length);                           // ~14.14
console.log(seg1.midpoint);                         // Vector2([5, 5])
console.log(seg1.intersects(seg2));                 // true (they cross)
console.log(seg1.closestPointTo(new Vector2([0, 5]))); // ~Vector2([2.5, 2.5])
```

## 3D Lines (Line3)

A 3D line is represented by a point and a direction vector in 3D space.

```typescript
import { Line3 } from '@rgsoft/geometry';
import { Vector3 } from '@rgsoft/linear';

const line = new Line3(
  new Vector3([0, 0, 0]),      // point on line
  new Vector3([1, 1, 1])       // direction
);
```

### Properties

- **`point: Vector3`** — A point on the line.
- **`direction: Vector3`** — The direction vector.

### Methods

- **`at(t: number): Vector3`** — Returns the point on the line at parameter t: `point + t * direction`.
- **`project(point: Vector3): Vector3`** — Projects a point onto the line.
- **`projectT(point: Vector3): number`** — Returns the parameter t of the projection.
- **`distanceToPoint(point: Vector3): number`** — Computes the perpendicular distance from a point to the line.
- **`distanceToLine(other: Line3): number`** — Computes the minimum distance between this line and another line (for skew lines).

### Example

```typescript
const line = new Line3(
  new Vector3([0, 0, 0]),
  new Vector3([1, 0, 0])  // line along x-axis
);

console.log(line.at(5));                            // Vector3([5, 0, 0])
console.log(line.project(new Vector3([5, 5, 5]))); // Vector3([5, 0, 0])
console.log(line.distanceToPoint(new Vector3([0, 3, 4]))); // 5
```

## Working with Lines and Segments

Lines and segments are often used together for geometric algorithms:

```typescript
import { Line2, Segment2 } from '@rgsoft/geometry';
import { Vector2 } from '@rgsoft/linear';

// Convert segment to line for more operations
const segment = new Segment2(new Vector2([0, 0]), new Vector2([10, 0]));
const line = segment.toLine();

// Test intersection of segments
const seg2 = new Segment2(new Vector2([5, -5]), new Vector2([5, 5]));
if (segment.intersects(seg2)) {
  console.log('Segments intersect');
}

// Find closest point on segment to a query point
const queryPoint = new Vector2([5, 10]);
const closest = segment.closestPointTo(queryPoint);
```
