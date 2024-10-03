import { CrookstonComponentsModule } from "./components";
import { SharedModule } from "@src/shared";
import { View } from "@src/view-code";

angular
  .module("viewCustom", [SharedModule, CrookstonComponentsModule])
  .constant("view", View.CROOKSTON);
