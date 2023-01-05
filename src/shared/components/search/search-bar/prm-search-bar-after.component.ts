import { ViewCode } from "../../../../view-code";

class PrmSearchBarAfterController {
  private parentCtrl: ng.IComponentController;

  static $inject = ["$scope", "$element"];
  constructor(
    private $scope: ng.IScope,
    private $element: ng.IAugmentedJQuery
  ) {}

  $onInit() {
    switch (this.parentCtrl.vid) {
      case ViewCode.TWINCITIES:
        this.hideTabSuggestions();
        this.hideBlendedTabSelector();
        // The parent controller re-initializes its settings on search state changes,
        // so we need to re-hide the selector
        this.$scope.$on("$stateChangeSuccess", () =>
          this.hideBlendedTabSelector()
        );
        break;
      case ViewCode.MORRIS:
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
    return this.parentCtrl.selectedTab === "article_discovery";
  }

  hideTabSelector() {
    this.parentCtrl.showTabsAndScopes = false;
  }
}

export const PrmSearchBarAfterComponent = {
  bindings: { parentCtrl: "<" },
  controller: PrmSearchBarAfterController,
};
