import { randomNumber } from "./number";
import { Exclude } from "../types";

// Will return undefined with an empty array
export const randomInArray = <T>(array: T[], exclude?: Exclude): T =>
  array[randomNumber(0, array.length - 1, exclude)];
