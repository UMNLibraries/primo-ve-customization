import "./topbar.scss";
import { PrmSkipToAfterComponent } from "./skip-to";

export const TopbarModule = angular
  .module("topbar", [])
  .component("prmSkipToAfter", PrmSkipToAfterComponent).name;
