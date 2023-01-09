import template from "./prm-loans-overview-after.html";

class PrmLoansOverviewAfterController implements ng.IController {
  static $inject = ["illiadEnabled"];
  constructor(private illiadEnabled: boolean) {}
}

export const PrmLoansOverviewAfterComponent: ng.IComponentOptions = {
  controller: PrmLoansOverviewAfterController,
  template: template,
};
