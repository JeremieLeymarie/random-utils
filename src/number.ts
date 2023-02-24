import { randomInArray } from "./array";
import { Exclude, ExcludeRange } from "../types";

export const simpleRandomNumber = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const randomNumber = (
  firstLimit: number,
  secondLimit: number,
  exclude?: Exclude
): number => {
  const min = Math.min(firstLimit, secondLimit);
  const max = Math.max(firstLimit, secondLimit);

  if (
    exclude === undefined ||
    (Array.isArray(exclude) && exclude.length === 0)
  ) {
    return simpleRandomNumber(min, max);
  }

  const computedArray = computeArray(min, max, exclude);

  if (!computedArray.length) {
    throw new Error("Invalid range");
  }
  return randomInArray(computedArray);
};

const computeArray = (min: number, max: number, exclude: Exclude): number[] => {
  let computedArray: number[];

  if (typeof exclude === "number") {
    computedArray = computeArrayWithOneExcludedNumber(min, max, exclude);
  } else if (Array.isArray(exclude)) {
    if (typeof exclude[0] === "number") {
      computedArray = computeArrayWithManyExcludedNumbers(
        min,
        max,
        exclude as number[]
      );
    } else {
      computedArray = computeArrayWithManyExclusionRanges(
        min,
        max,
        exclude as ExcludeRange[]
      );
    }
  } else {
    computedArray = computeArrayWithOneExclusionRange(min, max, exclude);
  }
  return computedArray;
};

// All of this code could be much shorter
// I'll have to check if the perf gain is sufficient to justify the extra code

export const computeArrayWithOneExcludedNumber = (
  min: number,
  max: number,
  excludedNumber: number
): number[] => {
  const array: number[] = [];
  for (let i = min; i <= max; i++) {
    if (i !== excludedNumber) {
      array.push(i);
    }
  }
  return array;
};

export const computeArrayWithManyExcludedNumbers = (
  min: number,
  max: number,
  excludedNumbers: number[]
): number[] => {
  const array: number[] = [];
  for (let i = min; i <= max; i++) {
    if (excludedNumbers.includes(i)) {
      continue;
    }
    array.push(i);
  }
  return array;
};

export const computeArrayWithManyExclusionRanges = (
  min: number,
  max: number,
  excludeRanges: ExcludeRange[]
): number[] => {
  const array: number[] = [];
  let i = min;
  while (i <= max) {
    let shouldSkipIteration = false;
    // Optimization possibility: remove used ranges, to not iterate over them when already processed
    for (let j = 0; j < excludeRanges.length; j++) {
      if (excludeRanges[j].rangeStart <= i && excludeRanges[j].rangeEnd >= i) {
        shouldSkipIteration = true;
        i = excludeRanges[j].rangeEnd + 1;
        if (i > max) {
          return array;
        }
      }
    }
    if (shouldSkipIteration) {
      continue;
    }
    array.push(i);
    i++;
  }
  return array;
};

export const computeArrayWithOneExclusionRange = (
  min: number,
  max: number,
  excludeRange: ExcludeRange
): number[] => {
  const array: number[] = [];
  let i = min;
  while (i <= max) {
    if (excludeRange.rangeStart <= i && excludeRange.rangeEnd >= i) {
      i = excludeRange.rangeEnd + 1;
      if (i > max) {
        return array;
      }
    }
    array.push(i);
    i++;
  }
  return array;
};
