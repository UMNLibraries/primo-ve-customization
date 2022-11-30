import GetItNote from "./get-it-note/get-it-note.component";

export default angular
  .module("getIt", [])
  .component("prmRequestServicesAfter", {
    template: "<get-it-note></get-it-note>",
  })
  .component("getItNote", GetItNote).name;
