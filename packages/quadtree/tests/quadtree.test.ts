import { beforeEach, describe, expect, it, vi } from 'vitest';
import { QuadTree } from '../src';
import { Rect } from '@rgsoft/geometry';
import { Vector2 } from '@rgsoft/linear';

describe(QuadTree.name, () => {

    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('creates an instance', () => {
        const boundary = new Rect(new Vector2([0, 0]), 16, 16);
        const k = 1;
        const q = new QuadTree(k, boundary);

        expect(q).toBeInstanceOf(QuadTree);
    });

    it('adds a point', () => {
        const boundary = new Rect(new Vector2([0, 0]), 16, 16);
        const k = 1;
        const p = new Vector2([4, 4]);
        const q = new QuadTree(k, boundary);

        expect(q).toBeInstanceOf(QuadTree);

        q.addPoint(p);
        expect(q.getPoints().length).toBe(1);
        expect(q.getQuadrants()).toBe(undefined);
    });

    it('adds points subdividing', () => {
        const boundary = new Rect(new Vector2([0, 0]), 16, 16);
        const k = 1;
        const pts: Vector2[] =
        [
          new Vector2([4, 4]),
          new Vector2([6, 6]),
          new Vector2([12, 4]),
          new Vector2([12, 12]),
          new Vector2([4, 12]),
        ];
        const q = new QuadTree(k, boundary);

        expect(q).toBeInstanceOf(QuadTree);

        pts.forEach(p => q.addPoint(p));

        expect(q.getPoints().length).toBe(1);
        expect(q.getQuadrants()).not.toBe(undefined);
        expect(q.getQuadrants()![0].getPoints().length).toBe(1);
        expect(q.getQuadrants()![1].getPoints().length).toBe(1);
        expect(q.getQuadrants()![2].getPoints().length).toBe(1);
        expect(q.getQuadrants()![3].getPoints().length).toBe(1);
    });

    it('fails on point outside boundary', () => {
        const boundary = new Rect(new Vector2([0, 0]), 16, 16);
        const k = 1;
        const pt = new Vector2([24, 4]);
        const q = new QuadTree(k, boundary);

        expect(q).toBeInstanceOf(QuadTree);
        expect(() => q.addPoint(pt)).toThrowError(
          "Point { x: 24, y: 4 } outside boundary",
        );
    });

    it('queries points in an area', () => {
        const boundary = new Rect(new Vector2([0, 0]), 120, 120);
        const area = new Rect(new Vector2([30, 30]), 25, 25);
        const k = 1;
        const pts: Vector2[] =
        [
          new Vector2([40, 40]),
          new Vector2([50, 50]),
          new Vector2([120, 40]),
          new Vector2([120, 120]),
          new Vector2([40, 120]),
        ];
        const q = new QuadTree(k, boundary);

        expect(q).toBeInstanceOf(QuadTree);

        pts.forEach(p => q.addPoint(p));
        const result = q.query(area);

        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(2);

    });
});
