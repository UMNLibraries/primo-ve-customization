import { SharedModule } from "../../shared";
import ViewCode from "../../view-code";
import MorrisComponents from "./components/morris-components.module";

angular
  .module("viewCustom", [SharedModule, MorrisComponents])
  .constant("view", ViewCode.MORRIS);
