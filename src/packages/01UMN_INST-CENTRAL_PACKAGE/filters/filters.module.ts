import uniqByKeys from './uniq-by-keys.filter';

export default angular
  .module('filters', [])
  .filter('uniqByKeys', uniqByKeys)
  .name;
