import "./no-results.scss";
import template from "./no-results.html";

class NoResultsController {
  private prmSearchResultListCtrl: ng.IComponentController;

  get searchString() {
    return this.prmSearchResultListCtrl.searchString;
  }
}

export const NoResultsComponent = {
  template: template,
  controller: NoResultsController,
  require: { prmSearchResultListCtrl: "^^prmSearchResultList" },
};
