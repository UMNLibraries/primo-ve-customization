// @ts-ignore
import HathiTrustAvailability from "primo-explore-hathitrust-availability";
import { BrowzineService } from "./browzine.service";
import { BrowzineComponent } from "./browzine.component";
import { AvailabilityOverrideComponent } from "./availability-override.component";
import { PrmSearchResultAvailabilityLineAfterComponent } from "./prm-search-result-availability-line-after.component";

export const SearchResultAvailabilityModule = angular
  .module("searchResultAvailability", [HathiTrustAvailability])
  .service("browzineService", BrowzineService)
  .component("browzine", BrowzineComponent)
  .component("availabilityOverride", AvailabilityOverrideComponent)
  .component(
    "prmSearchResultAvailabilityLineAfter",
    PrmSearchResultAvailabilityLineAfterComponent
  ).name;
