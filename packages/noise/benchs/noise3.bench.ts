import { bench } from "vitest";
import { Simplex, Perlin, OpenSimplex, ValueNoise, WhiteNoise } from '../src';

const dataSize = 1e3;

const dx = new Float64Array(dataSize);
const dy = new Float64Array(dataSize);
const dz = new Float64Array(dataSize);
for (let i = 0; i < dataSize; i++) {
  dx[i] = Math.random() * 200 - 100;
  dy[i] = Math.random() * 200 - 100;
  dz[i] = Math.random() * 200 - 100;
}

const open = new OpenSimplex();
const perlin = new Perlin();
const simplex = new Simplex();
const value = new ValueNoise();
const white = new WhiteNoise();

let sink = 0;

bench("OpenSimplex 3D", () => {
  let sum = 0;
  for (let i = 0; i < dataSize; i++) {
    sum += open.noise3(dx[i], dy[i], dz[i]);
  }
  sink += sum;
});

bench("Perlin 3D", () => {
  let sum = 0;
  for (let i = 0; i < dataSize; i++) {
    const n = perlin.noise3(dx[i], dy[i], dz[i]);
    if (!Number.isFinite(n)) {
      const params = {
        x: dx[i],
        y: dy[i],
        noise: n,
      };;
      throw new Error(`Invalid noise generated: ${JSON.stringify(params)}`)
    }
    sum += n;
  }
  sink += sum;
});

bench("Simplex 3D", () => {
  let sum = 0;
  for (let i = 0; i < dataSize; i++) {
    const n = simplex.noise3(dx[i], dy[i], dz[i]);
    if (!Number.isFinite(n)) {
      const params = {
        x: dx[i],
        y: dy[i],
        noise: n,
      };
      throw new Error(`Invalid noise generated: ${JSON.stringify(params)}`);
    }
    sum += n;
  }
  sink += sum;
});

bench("Value 3D", () => {
  let sum = 0;
  for (let i = 0; i < dataSize; i++) {
    sum += value.noise3(dx[i], dy[i], dz[i]);
  }
  sink += sum;
});

bench("White 3D", () => {
  let sum = 0;
  for (let i = 0; i < dataSize; i++) {
    sum += white.noise3(dx[i], dy[i], dz[i]);
  }
  sink += sum;
});
