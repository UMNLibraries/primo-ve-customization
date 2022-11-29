import AskusButton from "./askus-button";

export default angular
  .module("morrisComponents", [])
  .component("askusButton", AskusButton)
  .component("prmSearchBookmarkFilterAfter", {
    template: "<askus-button></askus-button>",
  }).name;
