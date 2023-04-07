import { GoogleAnalyticsService } from "./google-analytics.service";

const view = "TEST";

describe("GoogleAnalytics Service", () => {
  let $rootScope: ng.IRootScopeService,
    $location: ng.ILocationService,
    $window: ng.IWindowService,
    googleAnalyticsService: GoogleAnalyticsService;

  beforeEach(
    angular.mock.inject(($injector) => {
      $rootScope = $injector.get("$rootScope");
      $location = $injector.get("$location");
      $window = $injector.get("$window");
      googleAnalyticsService = new GoogleAnalyticsService(
        $rootScope,
        $location,
        $window,
        view
      );
    })
  );

  it("should create a global ga function", () => {
    spyOn($window, "ga");
    expect($window.ga).toBeDefined();
  });

  it("should record pageview events when the location changes", () => {
    let url = "/foo";
    spyOn($window, "ga");
    googleAnalyticsService.trackPageviews();
    $rootScope.$broadcast("$locationChangeSuccess", url);
    expect($window.ga).toHaveBeenCalledWith("send", "pageview", {
      location: url,
    });
  });

  it("should forward event tracking data to GA", () => {
    spyOn($window, "ga");
    googleAnalyticsService.trackEvent("Links", "My Link Click");
    expect($window.ga).toHaveBeenCalledWith(
      "send",
      "event",
      "Links",
      "My Link Click",
      undefined
    );
  });
});
