import UmnFooter from "./umn-footer.component";

export default angular
  .module("footer", [])
  .component("umnFooter", UmnFooter)
  .component("prmExploreFooterAfter", {
    template: "<umn-footer></umn-footer>",
  }).name;
