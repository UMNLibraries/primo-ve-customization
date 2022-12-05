import ShibAuthEvents from "./shib-auth-events.service";
import ShibAuth from "./shib-auth.component";

export const ShibAuthModule = angular
  .module("shibAuth", [])
  .constant("shibAuthHost", "stacks.lib.umn.edu")
  .constant("shibAuthTarget", "https://stacks.lib.umn.edu/userapi/autologincb")
  .constant("shibAuthExpectedMsg", "stacks")
  .service("shibAuthEvents", ShibAuthEvents)
  .component("shibAuth", ShibAuth)
  .run(["shibAuthEvents", (shibAuthEvents) => shibAuthEvents.init()]).name;
