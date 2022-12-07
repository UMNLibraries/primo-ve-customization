import "./topbar.scss";
import PrmSkipToAfter from "./skip-to/prm-skip-to-after.component";

export const TopbarModule = angular
  .module("topbar", [])
  .component("prmSkipToAfter", PrmSkipToAfter).name;
