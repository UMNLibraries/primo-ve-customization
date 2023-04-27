import "./search-result-list.scss";

// @ts-ignore
import HathiTrustAvailability from "primo-explore-hathitrust-availability";
import { BrowzineService } from "./search-result-availability";
import { BrowzineComponent } from "./search-result-availability";
import { PrmSearchResultAvailabilityLineAfterComponent } from "./search-result-availability";
import { PrmSearchErrorMessageAfterComponent } from "./error-message";
import { SearchResultHelpComponent } from "./search-result-help";

export const SearchResultModule = angular
  .module("searchResult", [HathiTrustAvailability])
  .service("browzineService", BrowzineService)
  .component("browzine", BrowzineComponent)
  .component("prmSearchErrorMessageAfter", PrmSearchErrorMessageAfterComponent)
  .component(
    "prmSearchResultAvailabilityLineAfter",
    PrmSearchResultAvailabilityLineAfterComponent
  )
  .component("searchResultHelp", SearchResultHelpComponent)
  .component("prmSearchResultListAfter", {
    template: "<search-result-help></search-result-help>",
  }).name;
