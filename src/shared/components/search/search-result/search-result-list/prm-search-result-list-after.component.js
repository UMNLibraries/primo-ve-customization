import ViewCode from "../../../../../view-code";
import template from "./prm-search-result-list-after.html";

class PrmSearchResultListAfterAfterController {
  static $inject = ["$location", "view"];
  constructor($location, view) {
    this.$location = $location;
    this.view = view;
  }

  get visible() {
    return (
      this.view === ViewCode.TWINCITIES &&
      this.onSearchPage &&
      this.hasResults &&
      !this.searchInProgress
    );
  }

  get onSearchPage() {
    return (
      this.$location.path() === "/search" ||
      this.$location.path() === "/jsearch"
    );
  }

  get searchInProgress() {
    return this.prmSearchResultListCtrl.searchInProgress;
  }

  get searchString() {
    return this.prmSearchResultListCtrl.searchString;
  }

  get hasResults() {
    return this.prmSearchResultListCtrl.totalResults > 0;
  }
}

export default {
  require: { prmSearchResultListCtrl: "^^prmSearchResultList" },
  controller: PrmSearchResultListAfterAfterController,
  template: template,
};
