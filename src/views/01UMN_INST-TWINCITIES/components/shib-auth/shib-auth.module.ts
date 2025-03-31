import { ShibAuthEventsService } from "./shib-auth-events.service";
import { ShibAuthComponent } from "./shib-auth.component";

run.$inject = ["shibAuthEvents"];
function run(shibAuthEvents: ShibAuthEventsService) {
  shibAuthEvents.init();
}

export const ShibAuthModule = angular
  .module("shibAuth", [])
  .constant("shibAuthHost", "apps.lib.umn.edu")
  .constant("shibAuthTarget", "https://apps.lib.umn.edu/userapi/autologincb")
  .constant("shibAuthExpectedMsg", "apps")
  .service("shibAuthEvents", ShibAuthEventsService)
  .component("shibAuth", ShibAuthComponent)
  .run(run).name;
