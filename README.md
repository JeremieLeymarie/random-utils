# random-utils
random-utils is simply a little collection of utils to help generate random data, written in `typescript` and tested with `jest`.

## Install
```bash 
npm install random-utils
```

## Methods

### randomNumber

Will return a random integer in a given range. The order of the range limits doesn't matter. 
```ts
// basic usage
const age = randomNumber(0, 99); // same as randomNumber(99, 0)
```

It's also possible to exclude numbers from the range, in 4 different ways. 
```ts
// with excluded numbers 
const age = randomNumber(0, 99, 4);
// or
const age = randomNumber(0, 99, [4, 5, 6, 19]); 
// or 
const age = randomNumber(0, 99, {rangeStart : 4, rangeEnd : 6}); 
// or 
const age = randomNumber(0, 99, [{rangeStart : 4, rangeEnd : 6}, {rangeStart : 19, rangeEnd : 21}]); 
```

### randomInArray
The second parameter can exclude indices from the array, with the same syntaxes that randomNumber's `exclude` parameter

```ts
// basic usage
const age = randomInArray([1, 2, 3]); 
// with excluded indices
const age = randomInArray([1, 2, 3], 1); // will never return 2
// ... the other syntaxes work as well
```

### randomBool
Will return a random boolean, with a default of 50/50 chance.
```ts
// basic usage
const isHead = randomBool(); // 50% chance of being true
// with specific truth probability
const isRandomUtilsAwesome = randomBool(99); // 99% chance of being true
```


