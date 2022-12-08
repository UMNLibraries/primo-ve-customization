import { ShibAuthEventsService } from "./shib-auth-events.service";
import { ShibAuthComponent } from "./shib-auth.component";

export const ShibAuthModule = angular
  .module("shibAuth", [])
  .constant("shibAuthHost", "stacks.lib.umn.edu")
  .constant("shibAuthTarget", "https://stacks.lib.umn.edu/userapi/autologincb")
  .constant("shibAuthExpectedMsg", "stacks")
  .service("shibAuthEvents", ShibAuthEventsService)
  .component("shibAuth", ShibAuthComponent)
  .run(["shibAuthEvents", (shibAuthEvents) => shibAuthEvents.init()]).name;
