import { PrmIconAfterComponent } from "./prm-icon-after.component";
import toggle from "./svg-sprite-toggle.svg";
import "./icon.scss";

export const IconModule = angular
  .module("icon", [])
  .component("prmIconAfter", PrmIconAfterComponent)
  .config([
    "$mdIconProvider",
    ($mdIconProvider) => {
      $mdIconProvider.iconSet("toggle", toggle, 24);
    },
  ]).name;
