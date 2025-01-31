// Inspired by https://github.com/toggio/pseudoRandom/blob/main/pseudoRandom.js
import { useMemo } from "react";

// Honestly have no clue how this works exactly, but it generates a deterministic number from a given string.
function crc32(str: string) {
  let a,
    table = [],
    c;
  for (c = 0; c < 256; c++) {
    a = c;
    for (let f = 0; f < 8; f++) {
      a = a & 1 ? 3988292384 ^ (a >>> 1) : a >>> 1;
    }
    table[c] = a;
  }
  let hash = -1;
  for (let i = 0; i < str.length; i++) {
    hash = (hash >>> 8) ^ table[(hash ^ str.charCodeAt(i)) & 255];
  }
  return (hash ^ -1) >>> 0;
}

interface PseudoRandom {
  randInt: (min: number, max: number) => number;
}

export function usePseudoRandom<T>(
  seed: string,
  callback: (random: PseudoRandom) => T
) {
  const multiplier = 1664525;
  const modulus = 4294967296;

  return useMemo(() => {
    let counter = 0;
    let currentSeed = crc32(seed);
    return callback({
      randInt: (min: number, max: number) => {
        const c = crc32(
          String(counter) + String(currentSeed) + String(counter)
        );
        const newSeed = (currentSeed * multiplier + c) % modulus;
        counter++;
        currentSeed = newSeed;
        return Math.floor((newSeed / modulus) * (max - min + 1) + min);
      },
    });
  }, [seed, callback]);
}
