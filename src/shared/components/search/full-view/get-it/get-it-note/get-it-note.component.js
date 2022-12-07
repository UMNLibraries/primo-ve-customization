import "./get-it-note.scss";
import template from "./get-it-note.html";

const TRANSLATE_KEY = "getItNote";

class GetItNoteController {
  static $inject = ["$translate"];
  constructor($translate) {
    this.$translate = $translate;
  }

  $onInit() {
    this.$translate(`umn.${TRANSLATE_KEY}`).then((note) => (this.note = note));
  }

  get showNote() {
    return this.note && this.note != TRANSLATE_KEY;
  }
}

export const GetItNoteComponent = {
  controller: GetItNoteController,
  template: template,
};
