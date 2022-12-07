import template from "./prm-requests-overview-after.html";

class PrmRequestsOverviewAfterController {
  static $inject = ["illiadEnabled"];
  constructor(illiadEnabled) {
    this.illiadEnabled = illiadEnabled;
  }

  get showIllLink() {
    return !this.illiadEnabled;
  }
}

export const PrmRequestsOverviewAfterComponent = {
  controller: PrmRequestsOverviewAfterController,
  template: template,
};
