import { PrmNgrsResultsButtonAfterComponent } from "./prm-ngrs-results-button-after.component";
import { PrmGetItRequestAfterComponent } from "./prm-get-it-request-after.component";

export const NgrsModule = angular
  .module("ngrs", [])
  .component("prmGetItRequestAfter", PrmGetItRequestAfterComponent)
  .component(
    "prmNgrsResultsButtonAfter",
    PrmNgrsResultsButtonAfterComponent
  ).name;
