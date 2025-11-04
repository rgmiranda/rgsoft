import { Vector2 } from "./vector2";

/**
 * To find orientation of ordered triplet (p, q, r).
 * The function returns following values
 * 0 when p, q and r are collinear; -1 when clockwise, 1 counterclockwise
 *
 * @param { Vector2 } p
 * @param { Vector2 } q
 * @param { Vector2 } r
 * @returns { number }
 */
export function getOrientation(p: Vector2, q: Vector2, r: Vector2): number {
  // See https://www.geeksforgeeks.org/orientation-3-ordered-points/
  // for details of below formula.
  let val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);

  if (val == 0) return 0; // collinear

  return val > 0 ? -1 : 1; // clock or counterclock wise
}
