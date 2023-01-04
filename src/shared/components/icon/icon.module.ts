import { PrmIconAfterComponent } from "./prm-icon-after.component";
import toggle from "./svg-sprite-toggle.svg";
import "./icon.scss";

config.$inject = ["$mdIconProvider"];
function config($mdIconProvider: ng.material.IIconProvider) {
  $mdIconProvider.iconSet("toggle", toggle, 24);
}

export const IconModule = angular
  .module("icon", [])
  .component("prmIconAfter", PrmIconAfterComponent)
  .config(config).name;
