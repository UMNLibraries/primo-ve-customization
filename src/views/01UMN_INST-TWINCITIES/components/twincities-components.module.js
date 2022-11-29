import NoResults from "./no-results/no-results.component";
import SearchResultHelp from "./search-result-help/search-result-help.component";
import QuestionPoint from "./qpoint-chat/qpoint-chat.module";

export default angular
  .module("twincitiesComponents", [QuestionPoint])
  .component("noResults", NoResults)
  .component("searchResultHelp", SearchResultHelp)
  .component("prmSearchResultListAfter", {
    template: "<search-result-help></search-result-help>",
  })
  .component("prmNoSearchResultAfter", {
    template: "<no-results></no-results>",
  }).name;
