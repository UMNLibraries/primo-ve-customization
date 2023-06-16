/**
 * Just a hacky fix for legacy URL parameters
 */

const isLegacyOnlineFacet = (f: string) => f.includes("online_resources$$I");

const fixLegacyOnlineFacet = (f: string) =>
  f.replace(/online_resources\$\$I.*$/, "online_resources");

export class LegacyFacetRedirectService {
  static $inject = ["$location"];
  constructor(private $location: ng.ILocationService) {}

  init() {
    this.handleLegacyOnlineFacet();
  }

  private handleLegacyOnlineFacet(): void {
    const facet = this.$location.search()["facet"];
    if (facet === undefined) return;

    if (Array.isArray(facet) && facet.some(isLegacyOnlineFacet)) {
      this.$location.search("facet", facet.map(fixLegacyOnlineFacet));
    } else if (isLegacyOnlineFacet(facet)) {
      this.$location.search("facet", fixLegacyOnlineFacet(facet));
    }
  }
}
