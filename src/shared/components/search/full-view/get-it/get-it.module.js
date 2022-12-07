import { GetItNoteComponent } from "./get-it-note";

export const GetItModule = angular
  .module("getIt", [])
  .component("prmRequestServicesAfter", {
    template: "<get-it-note></get-it-note>",
  })
  .component("getItNote", GetItNoteComponent).name;
