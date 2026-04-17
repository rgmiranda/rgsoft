import { describe, expect, it } from "vitest";
import { getRectBox, triangulate } from "../src";
import { Vector2 } from "@rgsoft/linear";
import { Rect } from "@rgsoft/geometry";

describe(getRectBox.name, () => {

    it('calculates the rect box', () => {
        const pts = [
            new Vector2([-2, 0]),
            new Vector2([0, 3]),
            new Vector2([2, 0]),
            new Vector2([0, -2]),
        ];
        const rect = getRectBox(pts);
        const [a, b, c, d] = rect.vertex;
        expect(a).toEqual(new Vector2([-2, -2]));
        expect(b).toEqual(new Vector2([2, -2]));
        expect(c).toEqual(new Vector2([2, 3]));
        expect(d).toEqual(new Vector2([-2, 3]));
    });

    it('fails on no sites', () => {
        const pts: Vector2[] = [];
        expect(() => getRectBox(pts)).toThrowError("No points received");
    });

    it('triangulates points', () => {
        const rectBox = new Rect(new Vector2([0, 0]), 3, 3);
        const pts = [
            new Vector2([1, 1])
        ];
        const triangulation = triangulate(pts, {
            rectBox,
            excludeRectVertex: false
        });
        const [a, b, c, d] = rectBox.vertex;
        const [p] = pts;
        expect(Array.isArray(triangulation)).toBe(true);
        expect(triangulation.length).toBe(4);
        triangulation.forEach((t) => {
            expect(t.hasVertex(p)).toBe(true);
            expect(t.hasEdge(a, b) || t.hasEdge(b, c)  || t.hasEdge(c, d)  || t.hasEdge(d, a)).toBe(true);
        });
    });

    it('eliminates the rect box points', () => {
        const rectBox = new Rect(new Vector2([0, 0]), 3, 3);
        const pts = [
            new Vector2([1, 1]),
            new Vector2([1, 2]),
            new Vector2([2, 2]),
        ];
        const [ p, q, r ] = pts;
        const triangulation = triangulate(pts, {
            rectBox,
            excludeRectVertex: true
        });
        expect(Array.isArray(triangulation)).toBe(true);
        expect(triangulation.length).toBe(1);
        expect(triangulation[0].hasVertex(p)).toBe(true);
        expect(triangulation[0].hasVertex(q)).toBe(true);
        expect(triangulation[0].hasVertex(r)).toBe(true);
    });

});
