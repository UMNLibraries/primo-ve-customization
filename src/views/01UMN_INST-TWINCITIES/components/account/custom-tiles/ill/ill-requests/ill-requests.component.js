import template from "./ill-requests.html";

class IllRequestsController {
  static $inject = ["illiad", "$window"];
  constructor(illiad, $window) {
    this.illiad = illiad;
    this.$window = $window;
    this.requests = [];
  }

  /**
   * Maximum number of requests to display.
   */
  get maxDisplay() {
    return 3;
  }

  $onInit() {
    this.loadRequests();
  }

  hasRequests() {
    return Array.isArray(this.requests) && this.requests.length > 0;
  }

  loadRequests() {
    this.loading = true;
    this.illiad
      .getRequests()
      .then((requests) => (this.requests = requests))
      .finally(() => (this.loading = false));
  }

  goToRequestPage(txnNum) {
    this.$window.open(this.illiad.getRequestPageUrl(txnNum), "_blank");
  }
}

export const IllRequestsComponent = {
  controller: IllRequestsController,
  template: template,
};
