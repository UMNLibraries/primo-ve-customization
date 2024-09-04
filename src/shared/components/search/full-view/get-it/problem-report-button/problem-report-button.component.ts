import template from "./problem-report-button.html";
import "./problem-report-button.scss";

class ProblemReportButtonController implements ng.IController {
  private prmFullViewCtrl: ng.IController;

  isReportProblem(): boolean {
    return this.prmFullViewCtrl.isReportProblem();
  }

  openReportFromFullView(): void {
    this.prmFullViewCtrl.openReportFromFullView();
  }
}

export const ProblemReportButtonComponent: ng.IComponentOptions = {
  controller: ProblemReportButtonController,
  require: { prmFullViewCtrl: "^prmFullView" },
  template,
};
