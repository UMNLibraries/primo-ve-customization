import template from "./prm-alma-viewit-items-after.html";

class PrmAlmaViewitItemsAfterController implements ng.IController {
  private prmFullViewCtrl: ng.IController;

  isReportProblem(): boolean {
    return this.prmFullViewCtrl.isReportProblem();
  }

  openReportFromFullView(): void {
    this.prmFullViewCtrl.openReportFromFullView();
  }
}

export const PrmAlmaViewitItemsAfterComponent: ng.IComponentOptions = {
  controller: PrmAlmaViewitItemsAfterController,
  require: { prmFullViewCtrl: "^prmFullView" },
  template,
};
