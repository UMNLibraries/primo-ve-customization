import HathiTrustAvailability from "primo-explore-hathitrust-availability";
import BrowzineService from "./search-result-availability/browzine.service";
import BrowzineComponent from "./search-result-availability/browzine.component";
import PrmSearchResultListAfter from "./search-result-list/prm-search-result-list-after.component";
import PrmNoSearchResultAfter from "./search-result-list/prm-no-search-result-after.component";
import PrmSearchResultAvailabilityLineAfter from "./search-result-availability/prm-search-result-availability-line-after.component";
import PrmSearchErrorMessageAfter from "./error-message/prm-search-error-message-after.component";
import PrmAvailbilityOverride from "./search-result-availability/availability-override.component";

export default //  .component('prmSearchErrorMessageAfter', PrmSearchErrorMessageAfter)
angular
  .module("searchResult", [HathiTrustAvailability])
  .service("browzineService", BrowzineService)
  .component("browzine", BrowzineComponent)
  //  .component('availabilityOverride', PrmAvailbilityOverride)
  //  .component('prmNoSearchResultAfter', PrmNoSearchResultAfter)
  //  .component('prmSearchResultListAfter', PrmSearchResultListAfter)
  .component("prmSearchErrorMessageAfter", PrmSearchErrorMessageAfter)
  .component(
    "prmSearchResultAvailabilityLineAfter",
    PrmSearchResultAvailabilityLineAfter
  ).name;
