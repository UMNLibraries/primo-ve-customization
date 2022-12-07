import { SharedModule } from "../../shared";
import ViewCode from "../../view-code";

angular
  .module("viewCustom", [SharedModule])
  .constant("view", ViewCode.CROOKSTON);
