import { SharedModule } from "@src/shared";
import { View } from "@src/view-code";

angular.module("viewCustom", [SharedModule]).constant("view", View.CROOKSTON);
