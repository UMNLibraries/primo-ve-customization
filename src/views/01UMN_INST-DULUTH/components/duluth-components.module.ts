import { AskusButtonComponent } from "./askus-button";
import { NoResultsComponent } from "./no-results";
import { FooterModule } from "./footer";

export const DuluthComponentsModule = angular
  .module("duluthComponents", [FooterModule])
  .component("askusButton", AskusButtonComponent)
  .component("noResults", NoResultsComponent)
  .component("prmNoSearchResultAfter", {
    template: "<no-results></no-results>",
  })
  .component("prmSearchBookmarkFilterAfter", {
    template: "<askus-button></askus-button>",
  }).name;
