import GoogleAnalytics from "./google-analytics.service.js";

export default angular
  .module("googleAnalytics", [])
  .service("googleAnalytics", GoogleAnalytics)
  .run([
    "googleAnalytics",
    (googleAnalytics) => googleAnalytics.trackPageviews(),
  ]).name;
