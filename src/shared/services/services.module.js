import BloggerNotifications from "./blogger-notifications/blogger-notifications.module";
import GoogleAnalytics from "./google-analytics/google-analytics.module";

export default angular.module("services", [
  BloggerNotifications,
  GoogleAnalytics,
]).name;
