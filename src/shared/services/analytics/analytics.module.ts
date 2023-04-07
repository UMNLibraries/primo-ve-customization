import { GoogleAnalyticsService as Analytics } from "./google-analytics";

run.$inject = ["analytics"];
function run(analytics: Analytics) {
  analytics.trackPageviews();
}

export const AnalyticsModule = angular
  .module("analytics", [])
  .service("analytics", Analytics)
  .run(run).name;
