import "./color-theme/generated-theme.css";

import { ComponentsModule } from "./components";
import { FiltersModule } from "./filters";
import Services from "./services/services.module";

/**
 * This is functionally similar to the Primo 'centralCustom'
 * module in that it's intended to be shared among all views.
 */
export default angular.module("shared", [
  "angularLoad",
  ComponentsModule,
  FiltersModule,
  Services,
]).name;
