import "./no-results.scss";
import template from "./no-results.html";

class NoResultsController {
  get searchString() {
    return this.prmSearchResultListCtrl.searchString;
  }
}

export const NoResultsComponent = {
  template: template,
  controller: NoResultsController,
  require: { prmSearchResultListCtrl: "^^prmSearchResultList" },
};
