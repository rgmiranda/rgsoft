import { sfc32 } from "./sfc32";
import { xmur3 } from "./xmur3";

export function rngFactory(seed: string): () => number {
  const seeder = xmur3(seed);
  return sfc32(seeder(), seeder(), seeder(), seeder());
}
