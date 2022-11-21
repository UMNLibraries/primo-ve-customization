import GoogleAnalytics from "./google-analytics.module";

const view = "TEST";
angular.module(GoogleAnalytics).constant("view", view);

describe("GoogleAnalytics Service", () => {
  let $rootScope, $location, $window, view, googleAnalyticsService;

  beforeEach(angular.mock.module(GoogleAnalytics));

  beforeEach(
    angular.mock.inject(($injector) => {
      $rootScope = $injector.get("$rootScope");
      $location = $injector.get("$location");
      $window = $injector.get("$window");
      googleAnalyticsService = $injector.get("googleAnalytics");
    })
  );

  it("should create a global ga function", () => {
    expect($window.ga).toBeDefined();
  });

  it("should set the view dimension", () => {
    spyOn($window, "ga");
    expect($window.ga).toHaveBeenCalledWith("set", "dimenstion2", view);
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
