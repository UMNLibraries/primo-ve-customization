import { SharedModule } from "../../shared";
import ViewCode from "../../view-code";
import DuluthComponents from "./components/duluth-components.module";

angular
  .module("viewCustom", [SharedModule, DuluthComponents])
  .constant("view", ViewCode.DULUTH);
