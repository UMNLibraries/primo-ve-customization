import { BloggerNotificationsService } from "./blogger-notifications.service";

const BASE_URL = "https://umnprimonotifications.blogspot.com";

export const BloggerNotificationsModule = angular
  .module("bloggerNotifications", [])
  .service("bloggerNotifications", BloggerNotificationsService)
  .constant("bloggerBaseUrl", BASE_URL)
  .config([
    "$sceDelegateProvider",
    "bloggerBaseUrl",
    ($sceDelegateProvider, bloggerBaseUrl) => {
      let urlWhitelist = $sceDelegateProvider.resourceUrlWhitelist();
      urlWhitelist.push(`${bloggerBaseUrl}**`);
      $sceDelegateProvider.resourceUrlWhitelist(urlWhitelist);
    },
  ])
  .run([
    "bloggerNotifications",
    (bloggerNotifications) => bloggerNotifications.show(),
  ]).name;
