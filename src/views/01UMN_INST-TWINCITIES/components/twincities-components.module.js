import NoResults from "./no-results/no-results.component";
import SearchResultHelp from "./search-result-help/search-result-help.component";

export default angular
  .module("twincitiesComponents", [])
  .component("noResults", NoResults)
  .component("searchResultHelp", SearchResultHelp)
  .component("prmSearchResultListAfter", {
    template: "<search-result-help></search-result-help>",
  })
  .component("prmNoSearchResultAfter", {
    template: "<no-results></no-results>",
  }).name;
