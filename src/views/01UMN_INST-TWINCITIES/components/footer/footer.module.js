import { UmnFooterComponent } from "./umn-footer.component";

export const FooterModule = angular
  .module("footer", [])
  .component("umnFooter", UmnFooterComponent)
  .component("prmExploreFooterAfter", {
    template: "<umn-footer></umn-footer>",
  }).name;
