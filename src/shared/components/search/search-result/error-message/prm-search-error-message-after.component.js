/**
 * log search errors in analytics service
 */
class PrmSearchErrorMessageAfterController {
  static $inject = ["googleAnalytics"];
  constructor(googleAnalytics) {
    this.googleAnalytics = googleAnalytics;
  }

  $onInit() {
    const label =
      this.parentCtrl.getErrorHeader() +
      ": " +
      this.parentCtrl.getErrorDescription();
    this.googleAnalytics.trackEvent("Errors", "Search Error Message", label);
  }
}

export const PrmSearchErrorMessageAfterComponent = {
  bindings: { parentCtrl: "<" },
  controller: PrmSearchErrorMessageAfterController,
};
