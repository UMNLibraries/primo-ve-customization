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
const uniqByKeys = () => 
  (input: Array<object>, keys: Array<any>) => _.uniqBy(input, (obj: any) => keys.map(key => obj[key]).join());

export default uniqByKeys;
