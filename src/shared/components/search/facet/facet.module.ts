import { ExcludeBeyondToggleComponent } from "./exclude-beyond-toggle";
import { PrmFacetAfterComponent } from "./prm-facet-after.component";

export const FacetModule = angular
  .module("facet", [])
  .component("excludeBeyondToggle", ExcludeBeyondToggleComponent)
  .component("prmFacetAfter", PrmFacetAfterComponent).name;
