import "./no-results.scss";
import template from "./no-results.html";

class NoResultsController implements ng.IController {
  private prmSearchResultListCtrl: ng.IComponentController;

  get searchString() {
    return this.prmSearchResultListCtrl.searchString;
  }
}

export const NoResultsComponent: ng.IComponentOptions = {
  template: template,
  controller: NoResultsController,
  require: { prmSearchResultListCtrl: "^^prmSearchResultList" },
};
