import { SharedModule } from "../../shared";
import { MorrisComponentsModule } from "./components";
import { View } from "../../view-code";

angular
  .module("viewCustom", [SharedModule, MorrisComponentsModule])
  .constant("view", View.MORRIS);
