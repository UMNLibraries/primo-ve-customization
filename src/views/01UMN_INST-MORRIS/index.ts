import { SharedModule } from "@src/shared";
import { View } from "@src/view-code";
import { MorrisComponentsModule } from "./components";

angular
  .module("viewCustom", [SharedModule, MorrisComponentsModule])
  .constant("view", View.MORRIS);
