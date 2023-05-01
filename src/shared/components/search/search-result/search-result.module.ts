import "./search-result-list.scss";

import { SearchResultAvailabilityModule } from "./search-result-availability";
import { PrmSearchErrorMessageAfterComponent } from "./error-message";
import { SearchResultHelpComponent } from "./search-result-help";

export const SearchResultModule = angular
  .module("searchResult", [SearchResultAvailabilityModule])
  .component("prmSearchErrorMessageAfter", PrmSearchErrorMessageAfterComponent)
  .component("searchResultHelp", SearchResultHelpComponent)
  .component("prmSearchResultListAfter", {
    template: "<search-result-help></search-result-help>",
  }).name;
