import ViewCode from "../../../../../view-code";
import template from "./prm-no-search-result-after.html";

class PrmNoSearchResultAfterAfterController {
  static $inject = ["view"];
  constructor(view) {
    this.view = view;
  }

  get enabled() {
    return (this.view = ViewCode.TWINCITIES);
  }

  get searchString() {
    return this.prmSearchResultListCtrl.searchString;
  }
}

export default {
  template: template,
  controller: PrmNoSearchResultAfterAfterController,
  require: { prmSearchResultListCtrl: "^^prmSearchResultList" },
};
