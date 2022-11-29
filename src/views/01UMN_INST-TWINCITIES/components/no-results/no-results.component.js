import "./no-results.scss";
import template from "./no-results.html";

class PrmNoSearchResultAfterAfterController {
  get searchString() {
    return this.prmSearchResultListCtrl.searchString;
  }
}

export default {
  template: template,
  controller: PrmNoSearchResultAfterAfterController,
  require: { prmSearchResultListCtrl: "^^prmSearchResultList" },
};
