import { SharedModule } from "../../shared";
import { DuluthComponentsModule } from "./components";
import { View } from "../../view-code";

angular
  .module("viewCustom", [SharedModule, DuluthComponentsModule])
  .constant("view", View.DULUTH);
