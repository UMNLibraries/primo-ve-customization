import SearchResultHelp from "./search-result-help/search-result-help.component";

export default angular
  .module("twincitiesComponents", [])
  .component("searchResultHelp", SearchResultHelp)
  .component("prmSearchResultListAfter", {
    template: "<search-result-help></search-result-help>",
  }).name;
