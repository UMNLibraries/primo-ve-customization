import "./umn-footer.scss";
import template from "./umn-footer.html";

class UmnFooterController implements ng.IController {
  static $inject = ["$mdMedia"];
  constructor(private $mdMedia: ng.material.IMedia) {}
}

export const UmnFooterComponent: ng.IComponentOptions = {
  template: template,
  controller: UmnFooterController,
};
