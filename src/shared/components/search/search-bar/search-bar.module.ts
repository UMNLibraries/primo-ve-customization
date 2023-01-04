//import { PrmSearchBarAfterComponent } from "./prm-search-bar-after.component";
import { PrmAdvncedSearchAfterComponent } from "./prm-advanced-search-after.component";
import { UncollapseAdvancedSearchComponent } from "./uncollapse-advanced-search.component";

export const SearchBarModule = angular
  .module("searchBar", [])
  //  .component('prmSearchBarAfter', PrmSearchBarAfterComponent)  // <-- TODO: still needed?
  .component("prmAdvancedSearchAfter", PrmAdvncedSearchAfterComponent)
  .component(
    "uncollapseAdvancedSearch",
    UncollapseAdvancedSearchComponent
  ).name;
