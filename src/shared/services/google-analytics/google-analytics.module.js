import { GoogleAnalyticsService } from "./google-analytics.service";

export const GoogleAnalyticsModule = angular
  .module("googleAnalytics", [])
  .service("googleAnalytics", GoogleAnalyticsService)
  .run([
    "googleAnalytics",
    (googleAnalytics) => googleAnalytics.trackPageviews(),
  ]).name;
