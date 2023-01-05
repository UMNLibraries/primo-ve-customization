import { NormalizedIllTransaction } from "../illiad-api.model";
import { IlliadService } from "../illiad.service";
import template from "./ill-requests.html";

class IllRequestsController {
  private requests: NormalizedIllTransaction[] = [];
  private loading: boolean;

  static $inject = ["illiad", "$window"];
  constructor(
    private illiad: IlliadService,
    private $window: ng.IWindowService
  ) {}

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

  goToRequestPage(txnNum: number) {
    this.$window.open(this.illiad.getRequestPageUrl(txnNum), "_blank");
  }
}

export const IllRequestsComponent = {
  controller: IllRequestsController,
  template: template,
};
