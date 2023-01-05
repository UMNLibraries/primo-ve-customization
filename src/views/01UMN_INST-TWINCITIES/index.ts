import ViewCode from "../../view-code";
import { SharedModule } from "../../shared";
import { TwinCitiesComponentsModule } from "./components";

angular
  .module("viewCustom", [SharedModule, TwinCitiesComponentsModule])
  .constant("view", ViewCode.TWINCITIES);
