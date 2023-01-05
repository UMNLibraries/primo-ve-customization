import template from "./prm-requests-overview-after.html";

class PrmRequestsOverviewAfterController {
  static $inject = ["illiadEnabled"];
  constructor(private illiadEnabled: boolean) {}

  get showIllLink() {
    return !this.illiadEnabled;
  }
}

export const PrmRequestsOverviewAfterComponent = {
  controller: PrmRequestsOverviewAfterController,
  template: template,
};
