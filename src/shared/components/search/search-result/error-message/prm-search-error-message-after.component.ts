import { GoogleAnalyticsService } from "@src/shared/services/google-analytics/google-analytics.service";

/**
 * log search errors in analytics service
 */
class PrmSearchErrorMessageAfterController implements ng.IController {
  private parentCtrl: ng.IController;

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

export const PrmSearchErrorMessageAfterComponent: ng.IComponentOptions = {
  bindings: { parentCtrl: "<" },
  controller: PrmSearchErrorMessageAfterController,
};
