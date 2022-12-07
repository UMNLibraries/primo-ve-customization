import template from "./prm-loans-overview-after.html";

class PrmLoansOverviewAfterController {
  static $inject = ["illiadEnabled"];
  constructor(illiadEnabled) {
    this.illiadEnabled = illiadEnabled;
  }
}

export const PrmLoansOverviewAfterComponent = {
  controller: PrmLoansOverviewAfterController,
  template: template,
};
