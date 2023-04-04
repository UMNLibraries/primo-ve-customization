import "./full-view.scss";
import "./recommendations.scss";

import { GetItModule } from "./get-it";
import { PrmServiceDetailsAfterComponent } from "./prm-service-details-after.component";

export const FullViewModule = angular
  .module("fullView", [GetItModule])
  .component("prmServiceDetailsAfter", PrmServiceDetailsAfterComponent).name;
