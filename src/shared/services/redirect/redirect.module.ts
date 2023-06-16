import { LegacyFacetRedirectService } from "./legacy-facets";

run.$inject = ["legacyFacetRedirect"];
function run(redirect: LegacyFacetRedirectService) {
  redirect.init();
}

export const RedirectModule = angular
  .module("redirect", [])
  .service("legacyFacetRedirect", LegacyFacetRedirectService)
  .run(run).name;
