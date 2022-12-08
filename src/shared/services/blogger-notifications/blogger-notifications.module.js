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
      let trustedUrls = $sceDelegateProvider.trustedResourceUrlList();
      trustedUrls.push(`${bloggerBaseUrl}**`);
      $sceDelegateProvider.trustedResourceUrlList(trustedUrls);
    },
  ])
  .run([
    "bloggerNotifications",
    (bloggerNotifications) => bloggerNotifications.show(),
  ]).name;
