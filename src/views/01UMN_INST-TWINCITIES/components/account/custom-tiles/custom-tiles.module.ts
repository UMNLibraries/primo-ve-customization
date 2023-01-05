import { CoursesModule } from "./courses";
import { IllModule } from "./ill";
import { InjectCustomTilesComponent } from "./inject-custom-tiles.component";

export const CustomTilesModule = angular
  .module("customTiles", [CoursesModule, IllModule])
  .component("customTiles", InjectCustomTilesComponent).name;
