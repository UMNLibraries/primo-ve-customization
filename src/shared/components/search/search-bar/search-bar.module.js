import PrmSearchBarAfter from './prm-search-bar-after.component.js';
import PrmAdvancedSearchAfter from './prm-advanced-search-after.component.js';
import UncollapseAdvancedSearch from './uncollapse-advanced-search.component.js';

export default angular
  .module('searchBar', [])
//  .component('prmSearchBarAfter', PrmSearchBarAfter)  // <-- TODO
  .component('prmAdvancedSearchAfter', PrmAdvancedSearchAfter)
  .component('uncollapseAdvancedSearch', UncollapseAdvancedSearch)
  .name;
