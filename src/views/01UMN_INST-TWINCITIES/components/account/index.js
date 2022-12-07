import { CustomTilesModule } from "./custom-tiles";
import { PrmLoansOverviewAfterComponent } from "./loans-overview";
import { PrmRequestsOverviewAfterComponent } from "./requests-overview";

export const AccountModule = angular
  .module("twincitiesAccount", [CustomTilesModule])
  .component("prmLoansOverviewAfter", PrmLoansOverviewAfterComponent)
  .component(
    "prmRequestsOverviewAfter",
    PrmRequestsOverviewAfterComponent
  ).name;
