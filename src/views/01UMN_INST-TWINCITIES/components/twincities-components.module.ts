import { FooterModule } from "./footer";
import { NoResultsComponent } from "./no-results";
import { SearchResultHelpComponent } from "./search-result-help";
import { ShibAuthModule } from "./shib-auth";
import { AccountModule } from "./account";

import "./snippet.scss";

export const TwinCitiesComponentsModule = angular
  .module("twincitiesComponents", [AccountModule, FooterModule, ShibAuthModule])
  .component("noResults", NoResultsComponent)
  .component("searchResultHelp", SearchResultHelpComponent)
  .component("prmSearchResultListAfter", {
    template: "<search-result-help></search-result-help>",
  })
  .component("prmNoSearchResultAfter", {
    template: "<no-results></no-results>",
  }).name;
