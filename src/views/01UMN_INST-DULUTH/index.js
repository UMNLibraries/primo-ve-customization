import Shared from "../../shared";
import ViewCode from "../../view-code";
import DuluthComponents from "./components/duluth-components.module";

angular
  .module("viewCustom", [Shared, DuluthComponents])
  .constant("view", ViewCode.DULUTH);
