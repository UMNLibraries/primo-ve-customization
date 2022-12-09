import { CoursesComponent } from "./courses.component";
import { CoursesService } from "./courses.service";

configure.$inject = ["$sceDelegateProvider"];
function configure($sceDelegateProvider) {
  let trustedUrls = $sceDelegateProvider.trustedResourceUrlList();
  trustedUrls.push(`${CoursesService.URL}**`);
  $sceDelegateProvider.trustedResourceUrlList(trustedUrls);
}

export const CoursesModule = angular
  .module("courses", [])
  .component("courses", CoursesComponent)
  .service("courses", CoursesService)
  .config(configure).name;
