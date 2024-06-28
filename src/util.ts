const compose =
  <T>(...fns: Function[]) =>
  (x: T) =>
    fns.reduceRight((y, fn) => fn(y), x);

export { compose };
