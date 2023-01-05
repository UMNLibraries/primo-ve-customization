// @ts-ignore
import HathiTrustAvailability from "primo-explore-hathitrust-availability";
import { BrowzineService } from "./search-result-availability";
import { BrowzineComponent } from "./search-result-availability";
import { PrmSearchResultAvailabilityLineAfterComponent } from "./search-result-availability";
import { PrmSearchErrorMessageAfterComponent } from "./error-message";

export const SearchResultModule = angular
  .module("searchResult", [HathiTrustAvailability])
  .service("browzineService", BrowzineService)
  .component("browzine", BrowzineComponent)
  .component("prmSearchErrorMessageAfter", PrmSearchErrorMessageAfterComponent)
  .component(
    "prmSearchResultAvailabilityLineAfter",
    PrmSearchResultAvailabilityLineAfterComponent
  ).name;
