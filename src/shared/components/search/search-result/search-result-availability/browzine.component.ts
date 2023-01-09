import { BrowzineService } from "./browzine.service";

class BrowzineController implements ng.IController {
  static $inject = ["browzineService", "$scope"];
  constructor(
    private browzineService: BrowzineService,
    private $scope: ng.IScope
  ) {}

  $onInit() {
    this.browzineService.handleSearchResult(this.$scope);
  }
}

export const BrowzineComponent: ng.IComponentOptions = {
  require: {
    parentCtrl: "^prmSearchResultAvailabilityLine",
  },
  controller: BrowzineController,
};
