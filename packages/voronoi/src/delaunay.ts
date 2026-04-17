import { Vector2 } from "@rgsoft/linear";
import { Rect, Triangle } from "@rgsoft/geometry";
import { TessellationConfig } from "./interfaces";

export const getRectBox = (sites: Vector2[]): Rect => {
  if (sites.length === 0) {
    throw new Error("No points received");
  }

  let minX = Number.MAX_SAFE_INTEGER;
  let minY = Number.MAX_SAFE_INTEGER;
  let maxX = Number.MIN_SAFE_INTEGER;
  let maxY = Number.MIN_SAFE_INTEGER;

  sites.forEach((p) => {
    if (p.x > maxX) {
      maxX = p.x;
    }
    if (p.x < minX) {
      minX = p.x;
    }
    if (p.y > maxY) {
      maxY = p.y;
    }
    if (p.y < minY) {
      minY = p.y;
    }
  });

  return new Rect(new Vector2([minX, minY]), maxX - minX, maxY - minY);
};

export const triangulate = (points: Vector2[], config: TessellationConfig = {}) : Triangle[]  => {

  const defaultConfig: TessellationConfig = {
    rectBox: getRectBox(points),
    excludeRectVertex: false,
  };
  config = Object.assign(defaultConfig, config);

  const rectBox = (config.rectBox && config.rectBox instanceof Rect)
    ? config.rectBox : getRectBox(points);

  const [A, B, C, D] = rectBox.vertex;
  let triangulation = [
    new Triangle(A, C, D),
    new Triangle(A, B, C),
  ];

  for (let i = 0; i < points.length; i++) {
    const point = points[i];

    const badTriangles = triangulation.filter(t => t.inCircle(point));

    const polygon : Vector2[] = [];

    for (let j = 0; j < badTriangles.length; j++) {
      const triangle = badTriangles[j];
      const edges = { a: true, b: true, c: true };
      for (let k = 0; k < badTriangles.length; k++) {
        if (k === j) {
          continue;
        }
        const triangle2 = badTriangles[k];
        edges.a = edges.a && !triangle2.hasEdge(triangle.a, triangle.b);
        edges.b = edges.b && !triangle2.hasEdge(triangle.b, triangle.c);
        edges.c = edges.c && !triangle2.hasEdge(triangle.c, triangle.a);
      }
      if (edges.a) {
        polygon.push(triangle.a, triangle.b);
      }
      if (edges.b) {
        polygon.push(triangle.b, triangle.c);
      }
      if (edges.c) {
        polygon.push(triangle.c, triangle.a);
      }
    }

    triangulation = triangulation.filter(t => !t.inCircle(point));

    for (let j = 0; j < polygon.length; j += 2) {
      triangulation.push(new Triangle(polygon[j], polygon[j + 1], point));
    }

  }

  if (config.excludeRectVertex) {
    triangulation = triangulation.filter(t => !(t.hasVertex(A) || t.hasVertex(B) || t.hasVertex(C) || t.hasVertex(D)))
  }

  return triangulation;
};
