import { GoogleAnalyticsModule } from "./google-analytics.module";
import { GoogleAnalyticsService } from "./google-analytics.service";

const view = "TEST";
angular.module(GoogleAnalyticsModule).constant("view", view);

describe("GoogleAnalytics Service", () => {
  let $rootScope: ng.IRootScopeService,
    //    $location: ng.ILocationService,
    $window: ng.IWindowService,
    googleAnalyticsService: GoogleAnalyticsService;

  beforeEach(angular.mock.module(GoogleAnalyticsModule));

  beforeEach(
    angular.mock.inject(($injector) => {
      $rootScope = $injector.get("$rootScope");
      //     $location = $injector.get("$location");
      $window = $injector.get("$window");
      googleAnalyticsService = $injector.get("googleAnalytics");
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