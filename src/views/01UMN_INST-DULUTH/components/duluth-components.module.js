import AskusBubble from "./askus-bubble";

export default angular
  .module("duluthComponents", [])
  .component("askusBubble", AskusBubble)
  .component("prmSearchBookmarkFilterAfter", {
    template: "<askus-bubble></askus-bubble>",
  }).name;
