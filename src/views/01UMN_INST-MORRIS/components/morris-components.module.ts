import "./style.scss";

import { AskusButtonComponent } from "./askus-button";
import { NoResultsComponent } from "./no-results";

export const MorrisComponentsModule = angular
  .module("morrisComponents", [])
  .component("askusButton", AskusButtonComponent)
  .component("prmSearchBookmarkFilterAfter", {
    template: "<askus-button></askus-button>",
  })
  .component("noResults", NoResultsComponent)
  .component("prmNoSearchResultAfter", {
    template: "<no-results></no-results>",
  }).name;
