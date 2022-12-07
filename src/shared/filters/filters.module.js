import { uniqByKeys } from "./uniq-by-keys.filter";

export const FiltersModule = angular
  .module("filters", [])
  .filter("uniqByKeys", uniqByKeys).name;
