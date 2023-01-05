import template from "./prm-loans-overview-after.html";

class PrmLoansOverviewAfterController {
  static $inject = ["illiadEnabled"];
  constructor(private illiadEnabled: boolean) {}
}

export const PrmLoansOverviewAfterComponent = {
  controller: PrmLoansOverviewAfterController,
  template: template,
};
