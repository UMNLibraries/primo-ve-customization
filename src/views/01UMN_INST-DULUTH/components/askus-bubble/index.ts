import "./askus-bubble.scss";
import icon from "./askus-bubble.png";
import template from "./askus-bubble.html";

class AskusBubbleController implements ng.IController {
  private icon: string;

  $onInit() {
    this.icon = icon;
  }
}

export const AskusBubbleComponent: ng.IComponentOptions = {
  controller: AskusBubbleController,
  template: template,
};
