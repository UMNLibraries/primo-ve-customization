import type { Analytics } from "../analytics";

const PROD_HOST_PATTERN = /^(primo.lib|umn.primo|umn.alma).*/;

function loadAnalytics(window: ng.IWindowService) {
  var _paq = (window._paq = window._paq || []);
  (function () {
    var u = "https://apps.lib.umn.edu/matomo/";
    _paq.push(["setTrackerUrl", u + "matomo.php"]);
    _paq.push(["setSiteId", "11"]);
    var d = document,
      g = d.createElement("script"),
      s = d.getElementsByTagName("script")[0];
    g.async = true;
    g.src = u + "matomo.js";
    s.parentNode.insertBefore(g, s);
  })();
}

export class Matomo implements Analytics {
  static $inject = ["$rootScope", "$location", "$window", "view"];
  constructor(
    private $rootScope: ng.IRootScopeService,
    private $location: ng.ILocationService,
    private $window: ng.IWindowService,
    private view: string
  ) {
    this.$window._paq = [];
    if (PROD_HOST_PATTERN.test(this.$location.host())) {
      loadAnalytics(this.$window);
    }
  }

  private get _paq(): Array<Array<string | Function>> {
    return this.$window._paq;
  }

  trackPageviews(): void {
    this._paq.push(["enableLinkTracking"]);
    this.$rootScope.$on("$locationChangeSuccess", (_event, newUrl, _oldUrl) => {
      this._paq.push(["setCustomUrl", newUrl]);
      this._paq.push(["trackPageView"]);
    });
  }

  trackEvent(category: string, action: string, label?: string): void {
    //this.$window.ga("send", "event", category, action, label);
    this._paq.push(["trackEvent", category, action, label]);
  }
}
