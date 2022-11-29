import "./umn-footer.scss";
import template from "./umn-footer.html";

class UmnFooterController {
  static $inject = ["$mdMedia"];

  constructor($mdMedia) {
    this.$mdMedia = $mdMedia;
  }
}

export default {
  template: template,
  controller: UmnFooterController,
};