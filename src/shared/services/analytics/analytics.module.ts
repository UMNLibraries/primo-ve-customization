//import { GoogleAnalyticsService as Analytics } from "./google-analytics";
import { Matomo as Analytics } from "./matomo";

run.$inject = ["analytics"];
function run(analytics: Analytics) {
  analytics.trackPageviews();
}

export const AnalyticsModule = angular
  .module("analytics", [])
  .service("analytics", Analytics)
  .run(run).name;
