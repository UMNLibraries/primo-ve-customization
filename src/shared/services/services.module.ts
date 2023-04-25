import { BloggerNotificationsModule } from "./blogger-notifications";
import { AnalyticsModule } from "./analytics";
import { RedirectModule } from "./redirect";

export const ServicesModule = angular.module("services", [
  BloggerNotificationsModule,
  AnalyticsModule,
  RedirectModule,
]).name;
