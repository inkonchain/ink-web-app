import { z } from "zod";

export function isValidEmail(email: string) {
  try {
    z.string().email().parse(email);

    return true;
  } catch {
    return false;
  }
}

export function isSquareAspectRatio(width: number, height: number): boolean {
  const aspectRatio = width / height;
  return Math.abs(aspectRatio - 1) < 0.05; // Allow small deviation from 1:1
}
