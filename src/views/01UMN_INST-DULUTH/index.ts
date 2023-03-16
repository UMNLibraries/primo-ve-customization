import { SharedModule } from "@src/shared";
import { View } from "@src/view-code";
import { DuluthComponentsModule } from "./components";

angular
  .module("viewCustom", [SharedModule, DuluthComponentsModule])
  .constant("view", View.DULUTH);
