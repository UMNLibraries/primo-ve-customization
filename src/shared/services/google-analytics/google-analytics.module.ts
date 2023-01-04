import { GoogleAnalyticsService } from "./google-analytics.service";

run.$inject = ["googleAnalytics"];
function run(googleAnalytics: GoogleAnalyticsService) {
  googleAnalytics.trackPageviews();
}

export const GoogleAnalyticsModule = angular
  .module("googleAnalytics", [])
  .service("googleAnalytics", GoogleAnalyticsService)
  .run(run).name;
