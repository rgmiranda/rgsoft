import { bench } from "vitest";
import { Simplex, Perlin, OpenSimplex, ValueNoise, WhiteNoise } from '../src';

const dataSize = 1e5;

const data = new Float64Array(dataSize);
for (let i = 0; i < dataSize; i++) {
  data[i] = Math.random() * 200 - 100;
}

const open = new OpenSimplex();
const perlin = new Perlin();
const simplex = new Simplex();
const value = new ValueNoise();
const white = new WhiteNoise();

bench("OpenSimplex 1D", () => {
  let sum = 0;
  for (const d of data) {
    sum += open.noise1(d);
  }
});

bench("Perlin 1D", () => {
  let sum = 0;
  for (const d of data) {
    sum += perlin.noise1(d);
  }
});

bench("Simplex 1D", () => {
  let sum = 0;
  for (const d of data) {
    sum += simplex.noise1(d);
  }
});

bench("Value 1D", () => {
  let sum = 0;
  for (const d of data) {
    sum += value.noise1(d);
  }
});

bench("White 1D", () => {
  let sum = 0;
  for (const d of data) {
    sum += white.noise1(d);
  }
});
