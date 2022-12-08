import "./search-result-help.scss";
import template from "./search-result-help.html";

class SearchResultHelpController {
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

export const SearchResultHelpComponent = {
  require: { prmSearchResultListCtrl: "^^prmSearchResultList" },
  controller: SearchResultHelpController,
  template: template,
};
