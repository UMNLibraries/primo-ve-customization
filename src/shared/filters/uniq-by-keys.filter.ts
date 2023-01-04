/**
 * Custom filter that removes duplicate objects from a list based on
 * 1 or more matching properties.
 *
 * @param input List of objects to de-duplicate
 * @param keys List of object properties to match
 *
 * TEMPLATE USAGE EXAMPLE
 * {{ users | uniqByKeys:['firstName', 'lastName'] }}
 *
 */
export const uniqByKeys =
  () =>
  <Type>(input: Array<Type>, keys: Array<keyof Type>): Array<Type> =>
    _.uniqBy(input, (obj) => keys.map((key) => obj[key]).join());
