import { View } from "../../../../view-code";

class PrmSearchBarAfterController implements ng.IController {
  private parentCtrl: ng.IController;

  static $inject = ["$scope", "$element"];
  constructor(
    private $scope: ng.IScope,
    private $element: ng.IAugmentedJQuery
  ) {}

  $onInit() {
    switch (this.parentCtrl.vid) {
      case View.TWINCITIES:
        this.hideTabSuggestions();
        this.hideBlendedTabSelector();
        // The parent controller re-initializes its settings on search state changes,
        // so we need to re-hide the selector
        this.$scope.$on("$stateChangeSuccess", () =>
          this.hideBlendedTabSelector()
        );
        break;
      case View.MORRIS:
        this.hideTabSuggestions();
        break;
    }
  }

  hideTabSuggestions() {
    this.parentCtrl.tabs = [];
  }

  hideBlendedTabSelector() {
    if (this.onBlendedTab()) this.hideTabSelector();
  }

  onBlendedTab() {
    return this.parentCtrl.selectedTab === "Everything";
  }

  hideTabSelector() {
    this.parentCtrl.showTabsAndScopes = false;
  }
}

export const PrmSearchBarAfterComponent: ng.IComponentOptions = {
  bindings: { parentCtrl: "<" },
  controller: PrmSearchBarAfterController,
};
