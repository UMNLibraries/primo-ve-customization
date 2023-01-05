import "./umn-footer.scss";
import template from "./umn-footer.html";

class UmnFooterController {
  static $inject = ["$mdMedia"];
  constructor(private $mdMedia: ng.material.IMedia) {}
}

export const UmnFooterComponent = {
  template: template,
  controller: UmnFooterController,
};
