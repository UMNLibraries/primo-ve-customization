import { FooterModule } from "./footer";
import { NoResultsComponent } from "./no-results";
import { ShibAuthModule } from "./shib-auth";
import { AccountModule } from "./account";

import "./snippet.scss";
import "./advanced-search.scss";

export const TwinCitiesComponentsModule = angular
  .module("twincitiesComponents", [AccountModule, FooterModule, ShibAuthModule])
  .component("noResults", NoResultsComponent)
  .component("prmNoSearchResultAfter", {
    template: "<no-results></no-results>",
  }).name;
