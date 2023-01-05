import { GoogleAnalyticsService } from "../../../../services/google-analytics/google-analytics.service";

/**
 * log search errors in analytics service
 */
class PrmSearchErrorMessageAfterController {
  private parentCtrl: ng.IComponentController;

  static $inject = ["googleAnalytics"];
  constructor(private googleAnalytics: GoogleAnalyticsService) {}

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
