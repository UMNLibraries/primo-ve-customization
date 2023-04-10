import { Matomo } from "./matomo.service";

const view = "TEST";

describe("Matomo Service", () => {
  let $rootScope: ng.IRootScopeService,
    $location: ng.ILocationService,
    $window: ng.IWindowService,
    matomo: Matomo;

  beforeEach(
    angular.mock.inject(($injector) => {
      $rootScope = $injector.get("$rootScope");
      $location = $injector.get("$location");
      $window = $injector.get("$window");
      matomo = new Matomo($rootScope, $location, $window, view);
    })
  );

  it("should create a global _paq array", () => {
    expect($window._paq).toBeDefined();
  });

  it("should record pageview events when the location changes", () => {
    let url = "/foo";
    matomo.trackPageviews();
    $rootScope.$broadcast("$locationChangeSuccess", url);
    const pageViewEvents = $window._paq.filter((e: string[]) =>
      e.includes("trackPageView")
    );
    expect(pageViewEvents).toHaveSize(1);
  });

  it("should push event tracking data to global _paq array", () => {
    matomo.trackEvent("Links", "My Link Click");
    expect($window._paq).toContain([
      "trackEvent",
      "Links",
      "My Link Click",
      undefined,
    ]);
  });
});
