import "./get-it.scss";
import { GetItNoteComponent } from "./get-it-note";
import { PrmRequestAfterComponent } from "./prm-request-after.component";
import { AlmaViewitModule } from "./alma-viewit";

export const GetItModule = angular
  .module("getIt", [AlmaViewitModule])
  .component("prmRequestServicesAfter", {
    template: "<get-it-note></get-it-note>",
  })
  .component("getItNote", GetItNoteComponent)
  .component("prmRequestAfter", PrmRequestAfterComponent).name;
