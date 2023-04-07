import { Analytics } from "@src/shared/services/analytics";

/**
 * log search errors in analytics service
 */
class PrmSearchErrorMessageAfterController implements ng.IController {
  private parentCtrl: ng.IController;

  static $inject = ["analytics"];
  constructor(private analytics: Analytics) {}

  $onInit() {
    const label =
      this.parentCtrl.getErrorHeader() +
      ": " +
      this.parentCtrl.getErrorDescription();
    this.analytics.trackEvent("Errors", "Search Error Message", label);
  }
}

export const PrmSearchErrorMessageAfterComponent: ng.IComponentOptions = {
  bindings: { parentCtrl: "<" },
  controller: PrmSearchErrorMessageAfterController,
};
