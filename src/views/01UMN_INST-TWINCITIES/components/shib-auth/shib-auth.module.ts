import { ShibAuthEventsService } from "./shib-auth-events.service";
import { ShibAuthComponent } from "./shib-auth.component";

run.$inject = ["shibAuthEvents"];
function run(shibAuthEvents: ShibAuthEventsService) {
  shibAuthEvents.init();
}

export const ShibAuthModule = angular
  .module("shibAuth", [])
  .constant("shibAuthHost", "stacks.lib.umn.edu")
  .constant("shibAuthTarget", "https://stacks.lib.umn.edu/userapi/autologincb")
  .constant("shibAuthExpectedMsg", "stacks")
  .service("shibAuthEvents", ShibAuthEventsService)
  .component("shibAuth", ShibAuthComponent)
  .run(run).name;
