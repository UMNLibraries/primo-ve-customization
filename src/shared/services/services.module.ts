import { BloggerNotificationsModule } from "./blogger-notifications";
import { GoogleAnalyticsModule } from "./google-analytics";

export const ServicesModule = angular.module("services", [
  BloggerNotificationsModule,
  GoogleAnalyticsModule,
]).name;
