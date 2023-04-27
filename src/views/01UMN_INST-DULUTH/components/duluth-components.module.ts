import { AskusBubbleComponent } from "./askus-bubble";
import { FooterModule } from "./footer";

export const DuluthComponentsModule = angular
  .module("duluthComponents", [FooterModule])
  .component("askusBubble", AskusBubbleComponent)
  .component("prmSearchBookmarkFilterAfter", {
    template: "<askus-bubble></askus-bubble>",
  }).name;
