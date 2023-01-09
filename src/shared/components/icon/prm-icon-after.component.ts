import template from "./icon.html";

/**
 * Replace the "pin" icon with an MD star icon. Note that we're also overriding
 * the OTB template here. The reason is that, in some cases (notably the top bar),
 * the SVG definition is a hard-coded attribute value on the component, and due
 * to the use of one-time binding, this cannot be dynamically modified.
 */
class PrmIconAfterController implements ng.IController {
  private parentCtrl: ng.IController;
  private svgIconSet: string;
  private iconDefinition: string;

  $onInit() {
    switch (this.parentCtrl.iconDefinition) {
      case "prm_pin":
        this.svgIconSet = "toggle";
        this.iconDefinition = "ic_star_border_24px";
        break;
      case "prm_unpin":
        this.svgIconSet = "toggle";
        this.iconDefinition = "ic_star_24px";
        break;
      default:
        this.svgIconSet = this.parentCtrl.svgIconSet;
        this.iconDefinition = this.parentCtrl.iconDefinition;
    }
  }
}

export const PrmIconAfterComponent: ng.IComponentOptions = {
  controller: PrmIconAfterController,
  template: template,
  bindings: { parentCtrl: "<" },
};
