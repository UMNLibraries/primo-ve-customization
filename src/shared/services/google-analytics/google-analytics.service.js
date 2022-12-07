const PROD_HOST_PATTERN = /^(primo.lib|umn.primo).*/;
const PROD_TRACKING_ID = "UA-20973358-32";
const STAGE_TRACKING_ID = "UA-20973358-29";

function loadAnalytics(window) {
  (function (i, s, o, g, r, a, m) {
    i["GoogleAnalyticsObject"] = r;
    (i[r] =
      i[r] ||
      function () {
        (i[r].q = i[r].q || []).push(arguments);
      }),
      (i[r].l = 1 * new Date());
    (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
  })(
    window,
    window.document,
    "script",
    "https://www.google-analytics.com/analytics.js",
    "ga"
  );
}

export class GoogleAnalyticsService {
  static $inject = ["$rootScope", "$location", "$window", "view"];
  constructor($rootScope, $location, $window, view) {
    this.$rootScope = $rootScope;
    this.$location = $location;
    this.$window = $window;
    loadAnalytics(this.$window);
    this.$window.ga("create", this.trackingId, "auto");
    this.$window.ga("set", "anonymizeIp", true);
    this.$window.ga("set", "dimension2", view);
  }

  get trackingId() {
    if (PROD_HOST_PATTERN.test(this.$location.host())) {
      return PROD_TRACKING_ID;
    } else {
      return STAGE_TRACKING_ID;
    }
  }

  trackPageviews() {
    this.$rootScope.$on("$locationChangeSuccess", (event, newUrl, oldUrl) => {
      this.$window.ga("send", "pageview", { location: newUrl });
    });
  }

  trackEvent(category, action, label) {
    this.$window.ga("send", "event", category, action, label);
  }
}
