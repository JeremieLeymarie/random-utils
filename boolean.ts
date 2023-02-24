export const randomBool = (truthChance: number = 50): boolean =>
  Math.random() * 100 < truthChance;
