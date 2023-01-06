import { loadAnalytics } from "./load-analytics";

const PROD_HOST_PATTERN = /^(primo.lib|umn.primo|umn.alma).*/;
const PROD_TRACKING_ID = "UA-20973358-32";
const STAGE_TRACKING_ID = "UA-20973358-29";

export class GoogleAnalyticsService {
  static $inject = ["$rootScope", "$location", "$window", "view"];
  constructor(
    private $rootScope: ng.IRootScopeService,
    private $location: ng.ILocationService,
    private $window: ng.IWindowService,
    private view: string
  ) {
    loadAnalytics(this.$window);
    this.$window.ga("create", this.trackingId, "auto");
    this.$window.ga("set", "anonymizeIp", true);
    this.$window.ga("set", "dimension2", this.view);
  }

  get trackingId() {
    if (PROD_HOST_PATTERN.test(this.$location.host())) {
      return PROD_TRACKING_ID;
    } else {
      return STAGE_TRACKING_ID;
    }
  }

  trackPageviews() {
    this.$rootScope.$on("$locationChangeSuccess", (_event, newUrl, _oldUrl) => {
      this.$window.ga("send", "pageview", { location: newUrl });
    });
  }

  trackEvent(category: string, action: string, label?: string) {
    this.$window.ga("send", "event", category, action, label);
  }
}
