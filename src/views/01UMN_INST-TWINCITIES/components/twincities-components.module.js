import Footer from "./footer/footer.module";
import NoResults from "./no-results/no-results.component";
import SearchResultHelp from "./search-result-help/search-result-help.component";
import QuestionPoint from "./qpoint-chat/qpoint-chat.module";
import { ShibAuthModule } from "./shib-auth";
import { AccountModule } from "./account";

export default angular
  .module("twincitiesComponents", [
    AccountModule,
    Footer,
    QuestionPoint,
    ShibAuthModule,
  ])
  .component("noResults", NoResults)
  .component("searchResultHelp", SearchResultHelp)
  .component("prmSearchResultListAfter", {
    template: "<search-result-help></search-result-help>",
  })
  .component("prmNoSearchResultAfter", {
    template: "<no-results></no-results>",
  }).name;
