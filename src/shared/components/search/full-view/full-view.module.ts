import "./full-view.scss";
import "./recommendations.scss";

import { GetItModule } from "./get-it";
import { NgrsModule } from "./ngrs";
import { PrmServiceDetailsAfterComponent } from "./prm-service-details-after.component";

export const FullViewModule = angular
  .module("fullView", [GetItModule, NgrsModule])
  .component("prmServiceDetailsAfter", PrmServiceDetailsAfterComponent).name;
