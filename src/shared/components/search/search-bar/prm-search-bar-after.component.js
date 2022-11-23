class PrmSearchBarAfterController {
  constructor($scope, $element) {
    this.$scope = $scope;
    this.$element = $element;
  }

  $onInit() {
    switch (this.parentCtrl.vid) {
      case "TWINCITIES":
        this.hideTabSuggestions();
        this.hideBlendedTabSelector();
        // The parent controller re-initializes its settings on search state changes,
        // so we need to re-hide the selector
        this.$scope.$on("$stateChangeSuccess", () =>
          this.hideBlendedTabSelector()
        );
        break;
      case "MORRIS":
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

PrmSearchBarAfterController.$inject = ["$scope", "$element"];

export default {
  bindings: { parentCtrl: "<" },
  controller: PrmSearchBarAfterController,
};
