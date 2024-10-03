import "./get-it.scss";
import { GetItNoteComponent } from "./get-it-note";
import { PrmRequestAfterComponent } from "./prm-request-after.component";
import { ProblemReportButtonComponent } from "./problem-report-button";

export const GetItModule = angular
  .module("getIt", [])
  .component("prmRequestServicesAfter", {
    template: "<get-it-note></get-it-note>",
  })
  .component("prmAlmaViewitItemsAfter", {
    template: "<problem-report-button></problem-report-button>",
  })
  .component("prmOpacAfter", {
    template: "<problem-report-button></problem-report-button>",
  })
  .component("getItNote", GetItNoteComponent)
  .component("problemReportButton", ProblemReportButtonComponent)
  .component("prmRequestAfter", PrmRequestAfterComponent).name;
