import ViewCode from "../../view-code";
import { SharedModule } from "../../shared";
import TwinCitiesComponents from "./components/twincities-components.module";

angular
  .module("viewCustom", [SharedModule, TwinCitiesComponents])
  .constant("view", ViewCode.TWINCITIES);
