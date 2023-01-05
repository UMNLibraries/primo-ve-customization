import { SharedModule } from "../../shared";
import { MorrisComponentsModule } from "./components";
import { ViewCode } from "../../view-code";

angular
  .module("viewCustom", [SharedModule, MorrisComponentsModule])
  .constant("view", ViewCode.MORRIS);
