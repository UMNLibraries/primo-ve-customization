import "./report-problem.scss";
import { PrmReportProblemAfterComponent } from "./prm-report-problem-after.component";

export const ReportProblemModule = angular
  .module("reportProblem", [])
  .component("prmReportProblemAfter", PrmReportProblemAfterComponent).name;
