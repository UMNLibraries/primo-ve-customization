import template from "./prm-requests-overview-after.html";

class PrmRequestsOverviewAfterController implements ng.IController {
  static $inject = ["illiadEnabled"];
  constructor(private illiadEnabled: boolean) {}

  get showIllLink() {
    return !this.illiadEnabled;
  }
}

export const PrmRequestsOverviewAfterComponent: ng.IComponentOptions = {
  controller: PrmRequestsOverviewAfterController,
  template: template,
};
