import { AskusBubbleComponent } from "./askus-bubble";

export const DuluthComponentsModule = angular
  .module("duluthComponents", [])
  .component("askusBubble", AskusBubbleComponent)
  .component("prmSearchBookmarkFilterAfter", {
    template: "<askus-bubble></askus-bubble>",
  }).name;
