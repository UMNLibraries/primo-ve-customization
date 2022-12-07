import { CoursesComponent } from "./courses.component";
import { CoursesService } from "./courses.service";

export const CoursesModule = angular
  .module("courses", [])
  .component("courses", CoursesComponent)
  .service("courses", CoursesService).name;
