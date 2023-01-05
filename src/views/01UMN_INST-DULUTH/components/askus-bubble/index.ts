import "./askus-bubble.scss";
import icon from "./askus-bubble.png";
import template from "./askus-bubble.html";

class AskusBubbleController {
  private icon: string;

  $onInit() {
    this.icon = icon;
  }
}

export const AskusBubbleComponent = {
  controller: AskusBubbleController,
  template: template,
};