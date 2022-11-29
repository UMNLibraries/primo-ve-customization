import ViewCode from "../../view-code";
import Shared from "../../shared";
import TwinCitiesComponents from "./components/twincities-components.module";

angular
  .module("viewCustom", [Shared, TwinCitiesComponents])
  .constant("view", ViewCode.TWINCITIES);
