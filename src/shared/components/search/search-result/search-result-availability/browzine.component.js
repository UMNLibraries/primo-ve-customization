class BrowzineController {
  static $inject = ["browzineService", "$scope"];
  constructor(browzineService, $scope) {
    this.browzineService = browzineService;
    this.$scope = $scope;
  }

  $onInit() {
    this.browzineService.handleSearchResult(this.$scope);
  }
}

export const BrowzineComponent = {
  require: {
    parentCtrl: "^prmSearchResultAvailabilityLine",
  },
  controller: BrowzineController,
};
