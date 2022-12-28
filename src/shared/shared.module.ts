import "./color-theme/generated-theme.css";

import { ComponentsModule } from "./components";
import { FiltersModule } from "./filters";
import { ServicesModule } from "./services";

/**
 * This is functionally similar to the Primo 'centralCustom'
 * module in that it's intended to be shared among all views.
 */
export const SharedModule = angular.module("shared", [
  "angularLoad",
  ComponentsModule,
  FiltersModule,
  ServicesModule,
]).name;
