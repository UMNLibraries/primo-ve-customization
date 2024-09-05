import { AskusButtonComponent } from "./askus-button";

export const CrookstonComponentsModule = angular
  .module("crookstonComponents", [])
  .component("askusButton", AskusButtonComponent)
  .component("prmSearchBookmarkFilterAfter", {
    template: "<askus-button></askus-button>",
  }).name;
