import { AskusButtonComponent } from "./askus-button";

export const MorrisComponentsModule = angular
  .module("morrisComponents", [])
  .component("askusButton", AskusButtonComponent)
  .component("prmSearchBookmarkFilterAfter", {
    template: "<askus-button></askus-button>",
  }).name;
