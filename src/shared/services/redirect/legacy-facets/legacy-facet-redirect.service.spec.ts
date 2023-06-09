import { LegacyFacetRedirectService } from "./legacy-facet-redirect.service";

describe("Legacy Facets Redirect Service", () => {
  let $rootScope: ng.IRootScopeService,
    $location: ng.ILocationService,
    redirect: LegacyFacetRedirectService;

  beforeEach(
    angular.mock.inject(($injector) => {
      $rootScope = $injector.get("$rootScope");
      $location = $injector.get("$location");
      redirect = new LegacyFacetRedirectService($location);
    })
  );

  it("fixes multiple facet parameters", () => {
    $location.url(
      "/search?facet=rtype,include,books&facet=tlevel,include,online_resources$$ITWINCITIES"
    );
    redirect.init();
    expect($location.search()["facet"]).toContain(
      "tlevel,include,online_resources"
    );
  });

  it("fixes single facet parameters", () => {
    $location.url("/search?facet=tlevel,include,online_resources$$ITWINCITIES");
    redirect.init();
    expect($location.search()["facet"]).toEqual(
      "tlevel,include,online_resources"
    );
  });

  it("does not modify non-legacy facets", () => {
    const url = "/search?facet=tlevel,include,online_resources";
    $location.url(url);
    redirect.init();
    expect($location.url()).toEqual(url);
  });

  it("does nothing when facet parameters are absent", () => {
    const url = "/search?query=any,contains,foo";
    $location.url(url);
    redirect.init();
    expect($location.url()).toEqual(url);
  });
});
