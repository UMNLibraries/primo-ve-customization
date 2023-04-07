import { BloggerNotificationsModule } from "./blogger-notifications";
import { AnalyticsModule } from "./analytics";

export const ServicesModule = angular.module("services", [
  BloggerNotificationsModule,
  AnalyticsModule,
]).name;
