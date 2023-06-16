import { RedirectService } from "./redirect.service";

run.$inject = ["redirect"];
function run(redirect: RedirectService) {
  redirect.init();
}

export const RedirectModule = angular
  .module("redirect", [])
  .service("redirect", RedirectService)
  .run(run).name;
