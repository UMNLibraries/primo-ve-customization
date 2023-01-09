import { SharedModule } from "../../shared";
import { View } from "../../view-code";

angular.module("viewCustom", [SharedModule]).constant("view", View.CROOKSTON);
