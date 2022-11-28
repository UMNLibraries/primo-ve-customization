import "./askus-bubble.scss";
import icon from "./askus-bubble.png";
import template from "./askus-bubble.html";

class AskusBubbleController {
  $onInit() {
    this.icon = icon;
  }
}

export default {
  controller: AskusBubbleController,
  template: template,
};
