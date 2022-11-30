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

const GetItNote = {
  controller: GetItNoteController,
  template: template,
};

export default GetItNote;
