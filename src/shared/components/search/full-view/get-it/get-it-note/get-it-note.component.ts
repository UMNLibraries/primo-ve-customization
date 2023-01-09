import "./get-it-note.scss";
import template from "./get-it-note.html";

const TRANSLATE_KEY = "getItNote";

class GetItNoteController implements ng.IController {
  private note: string;

  static $inject = ["$translate"];
  constructor(private $translate: ng.translate.ITranslateService) {}

  $onInit() {
    this.$translate(`umn.${TRANSLATE_KEY}`).then((note) => (this.note = note));
  }

  get showNote() {
    return this.note && this.note != TRANSLATE_KEY;
  }
}

export const GetItNoteComponent: ng.IComponentOptions = {
  controller: GetItNoteController,
  template: template,
};
