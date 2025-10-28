import { describe, expect, it } from "vitest";
import { Matrix } from "../src";

describe(Matrix.name, () => {
  it("sets and gets elements", () => {
    const m = new Matrix(3, 3);
    m.set(-90, 0, 2);
    expect(m.get(0, 2)).toBe(-90);
  });

  it("initializes with values", () => {
    const m = new Matrix(2, 2, [
      [1, 2],
      [3, 4],
    ]);
    expect(m.get(0, 1)).toBe(2);
    expect(m.get(1, 1)).toBe(4);
  });

  it("fails on invalid indexes", () => {
    const m = new Matrix(2, 2);
    expect(() => m.get(2, 0)).toThrowError("Row index 2 out of bounds");
    expect(() => m.get(0, 2)).toThrowError("Column index 2 out of bounds");
    expect(() => m.set(1, 2, 0)).toThrowError("Row index 2 out of bounds");
    expect(() => m.set(1, 0, 2)).toThrowError("Column index 2 out of bounds");
  });

  it("fails on invalid initial values", () => {
    expect(() => new Matrix(2, 2, [])).toThrowError(
      "Initial values do not match matrix dimensions"
    );
  });

  it("fails on invalid row or col number", () => {
    expect(() => new Matrix(-2, 2)).toThrowError(
      "Matrix dimensions must be positive integers"
    );
    expect(() => new Matrix(2, -2)).toThrowError(
      "Matrix dimensions must be positive integers"
    );
  });

  it("retrieves the base matrix", () => {
    const m = new Matrix(2, 2, [
      [1, 2],
      [3, 4],
    ]);
    expect(m.data).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });

  it("retrieves the base matrix", () => {
    const m = new Matrix(2, 2, [
      [1, 2],
      [3, 4],
    ]);
    expect(m.data).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });

  it("iterates through the elements", () => {
    const m = new Matrix(3, 4, [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
    ]);
    let i = 0;
    for (const e of m) {
      i++;
    }
    expect(i).toBe(12);
    i = 0;
    for (const r of m.rows()) {
      i++;
    }
    expect(i).toBe(3);
    i = 0;
    for (const c of m.columns()) {
      i++;
    }
    expect(i).toBe(4);
    for (const e of m.entries()) {
      expect(e).toEqual({
        row: expect.any(Number),
        col: expect.any(Number),
        value: expect.any(Number),
      });
    }
  });

  it("reduces the matrix", () => {
    const m = new Matrix(3, 4, [
      [1, 0, 3, -1],
      [0, 6, 1, 0],
      [2, 12, 9, 1],
    ]);
    const r = m.reduce();

    for (const e of r.entries()) {
      if (e.row === e.col) {
        expect(e.value).toBe(1);
      } else if (e.col < 3) {
        expect(e.value).toBe(0);
      }
    }
  });

  it("reduces wide matrix", () => {
    const m = new Matrix(3, 4, [
      [1, 0, 3, -1],
      [0, 6, 3, 0],
      [2, 12, 9, 1],
    ]);
    const r = m.reduce();
    
    expect(r.data).toEqual([
      [1, 0, 0, 2],
      [0, 1, 0, 1/2],
      [0, 0, 1, -1],
    ]);
  });

  it("reduces narrow matrix", () => {
    const m = new Matrix(3, 2, [
      [1, 1,],
      [1, 4],
      [2, 11],
    ]);
    const r = m.reduce();

    expect(r.data).toEqual([
      [1, 0],
      [0, 1],
      [0, 0],
    ]);
  });

  it("reduces linear dependent matrix", () => {
    const m = new Matrix(3, 3, [
      [1, 1, 0],
      [1, 4, -2],
      [2, 5, -2],
    ]);
    const r = m.reduce();

    expect(r.data).toEqual([
      [1, 0, 2 / 3],
      [0, 1, -2 / 3],
      [0, 0, 0],
    ]);
  });

  it("extends a matrix on the right", () => {
    const m = new Matrix(3, 4, [
      [1, 0, 3, -1],
      [0, 6, 1, 0],
      [2, 12, 9, 1],
    ]);
    const n = new Matrix(3, 1, [[-5], [7], [6]]);
    const extended = m.extendRight(n);

    expect(extended.data).toEqual([
      [1, 0, 3, -1, -5],
      [0, 6, 1, 0, 7],
      [2, 12, 9, 1, 6],
    ]);
  });

  it("generates identity matrix", () => {
    const m = Matrix.identity(3);
    expect(m.data).toEqual([
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ]);
  });

  it("extends a matrix on the below", () => {
    const m = new Matrix(2, 1, [[1], [0]]);
    const n = new Matrix(3, 1, [[-5], [7], [6]]);
    const extended = m.extendBelow(n);

    expect(extended.data).toEqual([[1], [0], [-5], [7], [6]]);
  });

  it("fails when extending invalid sizes", () => {
    const m = new Matrix(2, 2, [[1, 0], [0, -9]]);
    const n = new Matrix(3, 1, [[-5], [7], [6]]);
    expect(() => m.extendRight(n)).toThrowError(
      'Cannot extend to the right: row counts must match'
    );
    expect(() => m.extendBelow(n)).toThrowError(
      'Cannot extend below: column counts must match'
    );
  });

  it('gets a row', () => {
    const m = new Matrix(3, 4, [
      [1, 0, 3, -1],
      [0, 6, 1, 0],
      [2, 12, 9, 1],
    ]);
    expect(m.getRow(0)).toEqual([1, 0, 3, -1]);
  });

  it('gets a column', () => {
    const m = new Matrix(3, 4, [
      [1, 0, 3, -1],
      [0, 6, 1, 0],
      [2, 12, 9, 1],
    ]);
    expect(m.getColumn(2)).toEqual([3, 1, 9]);
  });

  it('fails when getting an invalid row index', () => {
    const m = new Matrix(3, 4, [
      [1, 0, 3, -1],
      [0, 6, 1, 0],
      [2, 12, 9, 1],
    ]);
    expect(() => m.getRow(-1)).toThrowError("Row index -1 out of bounds");
    expect(() => m.getRow(3)).toThrowError("Row index 3 out of bounds");
  });

  it('fails when getting an invalid column index', () => {
    const m = new Matrix(3, 4, [
      [1, 0, 3, -1],
      [0, 6, 1, 0],
      [2, 12, 9, 1],
    ]);
    expect(() => m.getColumn(-1)).toThrowError("Column index -1 out of bounds");
    expect(() => m.getColumn(4)).toThrowError("Column index 4 out of bounds");
  });

  it('swaps rows', () => {
    const m = new Matrix(3, 4, [
      [1, 0, 3, -1],
      [0, 6, 1, 0],
      [2, 12, 9, 1],
    ]);
    const result = m.swapRows(0, 2);
    expect(result.data).toEqual([
      [2, 12, 9, 1],
      [0, 6, 1, 0],
      [1, 0, 3, -1],
    ]);
  });

  it('adds scaled rows', () => {
    const m = new Matrix(3, 4, [
      [1, 0, 3, -1],
      [0, 6, 1, 0],
      [2, 12, 9, 1],
    ]);
    const result = m.addScaledRow(0, 2, -2);
    expect(result.data).toEqual([
      [1, 0, 3, -1],
      [0, 6, 1, 0],
      [0, 12, 3, 3],
    ]);
  });

  it('scales a row', () => {
    const m = new Matrix(3, 4, [
      [1, 0, 3, -1],
      [0, 6, 1, 0],
      [2, 12, 9, 1],
    ]);
    const result = m.scaleRow(2, 0.5);
    expect(result.data).toEqual([
      [1, 0, 3, -1],
      [0, 6, 1, 0],
      [1, 6, 4.5, 0.5],
    ]);
  });

  it('slices columns from the end of a matrix', () => {
    const m = new Matrix(3, 4, [
      [1, 0, 3, -1],
      [0, 6, 1, 0],
      [2, 12, 9, 1],
    ]);
    const result = m.sliceColumns(2);
    expect(result.data).toEqual([
      [3, -1],
      [1, 0],
      [9, 1],
    ]);
  });

  it('slices columns from the middle of a matrix', () => {
    const m = new Matrix(3, 4, [
      [1, 0, 3, -1],
      [0, 6, 1, 0],
      [2, 12, 9, 1],
    ]);
    const result = m.sliceColumns(1, 2);
    expect(result.data).toEqual([
      [0, 3],
      [6, 1],
      [12, 9],
    ]);
  });

  it('slices rows from the end of a matrix', () => {
    const m = new Matrix(3, 4, [
      [1, 0, 3, -1],
      [0, 6, 1, 0],
      [2, 12, 9, 1],
    ]);
    const result = m.sliceRows(2);
    expect(result.data).toEqual([
      [2, 12, 9, 1],
    ]);
  });

  it('slices rows from the middle of a matrix', () => {
    const m = new Matrix(3, 4, [
      [1, 0, 3, -1],
      [0, 6, 1, 0],
      [2, 12, 9, 1],
    ]);
    const result = m.sliceRows(1, 2);
    expect(result.data).toEqual([
      [0, 6, 1, 0],
      [2, 12, 9, 1],
    ]);
  });

  it('detects zero rows', () => {
    const m = new Matrix(3, 4, [
      [1, 0, 3, -1],
      [0, 6, 1, 0],
      [0, 0, 0, 1],
    ]);
    expect(m.hasZeroRows()).toBeFalsy();
    m.set(0, 2, 3);
    expect(m.hasZeroRows()).toBeTruthy();
  });

  it('inverts a matrix', () => {
    const m = new Matrix(3, 3, [
      [1, 0, 3],
      [0, 6, 3],
      [2, 12, 9],
    ]);
    const inv = m.invert();
    const result = m.multiply(inv);
    expect(result).toEqual(Matrix.identity(3));
  });

  it('fails on invalid size for inverse', () => {
    const m = new Matrix(2, 3, [
      [1, 0, 3],
      [0, 6, 3],
    ]);
    expect(() => m.invert()).toThrow("Cannot invert a non-square matrix");
  });

  it('fails on non-invertible matrix', () => {
    const m = new Matrix(3, 3, [
      [1, 0, 3],
      [0, 6, 3],
      [1, 6, 6],
    ]);
    expect(() => m.invert()).toThrow("Non-invertible matrix");
  });

  it('multiplies a matrix', () => {
    const m = new Matrix(2, 2, [
      [1, 1],
      [0, 6]
    ]);
    const n = new Matrix(2, 2, [
      [0, 1],
      [-1, 3]
    ]);
    const result = m.multiply(n);
    expect(result.data).toEqual([
      [-1, 4],
      [-6, 18],
    ]);
  });
  
  it("fails on invalid size for multiply", () => {
    const m = new Matrix(2, 3, [
      [1, 0, 3],
      [0, 6, 3],
    ]);
    const n = new Matrix(2, 3, [
      [1, 0, 3],
      [0, 6, 3],
    ]);
    expect(() => m.multiply(n)).toThrow(
      "Cannot multiply: columns and rows do not match"
    );
  });

  it("trasposes a matrix", () => {
    const m = new Matrix(2, 3, [
      [11, 1, -4],
      [0, 6, 3],
    ]);
    const result = m.traspose();
    expect(result.data).toEqual([
      [11, 0],
      [1, 6],
      [-4, 3],
    ]);
  });
});
