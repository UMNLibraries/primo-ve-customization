import "./search-result-help.scss";
import template from "./search-result-help.html";

class PrmSearchResultListAfterAfterController {
  static $inject = ["$location"];
  constructor($location) {
    this.$location = $location;
  }

  get visible() {
    return this.onSearchPage && this.hasResults && !this.searchInProgress;
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
