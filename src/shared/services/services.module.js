import BloggerNotifications from "./blogger-notifications/blogger-notifications.module";
import GoogleAnalytics from "./google-analytics/google-analytics.module";
import Config from "./config/config.module";

export default angular.module("services", [
  BloggerNotifications,
  GoogleAnalytics,
  Config,
]).name;
