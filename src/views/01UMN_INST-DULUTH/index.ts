import { SharedModule } from "../../shared";
import { DuluthComponentsModule } from "./components";
import { ViewCode } from "../../view-code";

angular
  .module("viewCustom", [SharedModule, DuluthComponentsModule])
  .constant("view", ViewCode.DULUTH);
