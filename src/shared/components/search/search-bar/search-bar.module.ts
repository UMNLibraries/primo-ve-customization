//import { PrmSearchBarAfterComponent } from "./prm-search-bar-after.component";
import { PrmAdvncedSearchAfterComponent } from "./advanced-search";
import { UncollapseAdvancedSearchComponent } from "./advanced-search";

export const SearchBarModule = angular
  .module("searchBar", [])
  //  .component('prmSearchBarAfter', PrmSearchBarAfterComponent)  // <-- TODO: still needed?
  .component("prmAdvancedSearchAfter", PrmAdvncedSearchAfterComponent)
  .component(
    "uncollapseAdvancedSearch",
    UncollapseAdvancedSearchComponent
  ).name;
