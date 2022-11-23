class PrmSearchErrorMessageAfterController {
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

PrmSearchErrorMessageAfterController.$inject = ["googleAnalytics"];

export default {
  bindings: { parentCtrl: "<" },
  controller: PrmSearchErrorMessageAfterController,
};
