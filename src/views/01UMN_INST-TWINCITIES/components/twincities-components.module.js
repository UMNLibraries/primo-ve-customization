import { FooterModule } from "./footer";
import { NoResultsComponent } from "./no-results";
import { SearchResultHelpComponent } from "./search-result-help";
import { QuestionPointModule } from "./qpoint-chat";
import { ShibAuthModule } from "./shib-auth";
import { AccountModule } from "./account";

export const TwinCitiesComponentsModule = angular
  .module("twincitiesComponents", [
    AccountModule,
    FooterModule,
    QuestionPointModule,
    ShibAuthModule,
  ])
  .component("noResults", NoResultsComponent)
  .component("searchResultHelp", SearchResultHelpComponent)
  .component("prmSearchResultListAfter", {
    template: "<search-result-help></search-result-help>",
  })
  .component("prmNoSearchResultAfter", {
    template: "<no-results></no-results>",
  }).name;
