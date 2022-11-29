import Shared from "../../shared";
import ViewCode from "../../view-code";
import MorrisComponents from "./components/morris-components.module";

angular
  .module("viewCustom", [Shared, MorrisComponents])
  .constant("view", ViewCode.MORRIS);
