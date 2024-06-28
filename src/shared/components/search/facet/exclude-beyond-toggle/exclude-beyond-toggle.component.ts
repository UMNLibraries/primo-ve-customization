import template from "./exclude-beyond-toggle.html";
import { Analytics } from "@src/shared/services/analytics";
import { compose } from "@src/util";

/**
 * Removes CDI/PCI results that do not have full-text availability
 * (inversion of Primo's "expand beyond" toggle).
 */
class ExcludeBeyondToggleController implements ng.IController {
  private rapidoSearchSlots: string[];
  private facetCtrl: ng.IController;
  private enabledProperties: (object: { property: boolean }) => string[] =
    compose(_.keys, _.pickBy);

  static $inject = ["analytics", "$location", "$window"];
  constructor(
    private analytics: Analytics,
    private $location: ng.ILocationService,
    private $window: ng.IWindowService
  ) {}

  $onInit() {
    this.rapidoSearchSlots = this.enabledProperties(
      this.$window.appConfig["system-configuration"].hide_rapido_expand_link_map
    );
  }

  /**
   * Track toggle clicks
   */
  onChange(): void {
    this.analytics.trackEvent(
      "Exclude CDI Availability Toggle",
      this.excludePcAvailability ? "Enabled" : "Disabled"
    );
  }

  get enabled(): boolean {
    return this.rapidoSearchSlots.includes(this.activeSearchSlot);
  }

  get excludePcAvailability(): boolean {
    return this.$location.search()["pcAvailability"] === "false";
  }

  set excludePcAvailability(value: boolean) {
    if (value === true) {
      this.$location.search("pcAvailability", "false");
    } else {
      this.$location.search("pcAvailability", null);
    }
  }

  private get activeSearchSlot(): string {
    return this.facetCtrl.searchService.getSearchObject().tab;
  }
}

export const ExcludeBeyondToggleComponent: ng.IComponentOptions = {
  controller: ExcludeBeyondToggleController,
  bindings: { facetCtrl: "<" },
  template,
};
