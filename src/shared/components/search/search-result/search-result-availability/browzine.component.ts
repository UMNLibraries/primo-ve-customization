import { BrowzineService } from "./browzine.service";

class BrowzineController {
  static $inject = ["browzineService", "$scope"];
  constructor(
    private browzineService: BrowzineService,
    private $scope: ng.IScope
  ) {}

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
