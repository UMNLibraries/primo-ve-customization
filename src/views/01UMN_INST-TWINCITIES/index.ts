import { SharedModule } from "@src/shared";
import { View } from "@src/view-code";
import { TwinCitiesComponentsModule } from "./components";

angular
  .module("viewCustom", [SharedModule, TwinCitiesComponentsModule])
  .constant("view", View.TWINCITIES);
