import { RedirectService } from "./redirect.service";

describe("Redirect Service", () => {
  let $rootScope: ng.IRootScopeService,
    $location: ng.ILocationService,
    redirect: RedirectService;

  beforeEach(
    angular.mock.inject(($injector) => {
      $rootScope = $injector.get("$rootScope");
      $location = $injector.get("$location");
      redirect = new RedirectService($location);
    })
  );

  it("fixes multiple facet parameters", () => {
    $location.url(
      "search?facet=rtype,include,books&facet=tlevel,include,online_resources$$ITWINCITIES"
    );
    redirect.init();
    expect($location.search()["facet"]).toContain(
      "tlevel,include,online_resources"
    );
  });

  it("fixes single facet parameters", () => {
    $location.url("search?facet=tlevel,include,online_resources$$ITWINCITIES");
    redirect.init();
    expect($location.search()["facet"]).toEqual(
      "tlevel,include,online_resources"
    );
  });
});
