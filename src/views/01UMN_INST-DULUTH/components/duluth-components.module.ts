import { AskusBubbleComponent } from "./askus-bubble";
import { NoResultsComponent } from "./no-results";
import { FooterModule } from "./footer";

export const DuluthComponentsModule = angular
  .module("duluthComponents", [FooterModule])
  .component("askusBubble", AskusBubbleComponent)
  .component("noResults", NoResultsComponent)
  .component("prmNoSearchResultAfter", {
    template: "<no-results></no-results>",
  })
  .component("prmSearchBookmarkFilterAfter", {
    template: "<askus-bubble></askus-bubble>",
  }).name;
