import { BloggerNotificationsService } from "./blogger-notifications.service";

const BASE_URL = "https://umnprimonotifications.blogspot.com";

config.$inject = ["$sceDelegateProvider", "bloggerBaseUrl"];
function config(
  $sceDelegateProvider: ng.ISCEDelegateProvider,
  bloggerBaseUrl: string
) {
  let trustedUrls = $sceDelegateProvider.trustedResourceUrlList();
  trustedUrls.push(`${bloggerBaseUrl}**`);
  $sceDelegateProvider.trustedResourceUrlList(trustedUrls);
}

export const BloggerNotificationsModule = angular
  .module("bloggerNotifications", [])
  .service("bloggerNotifications", BloggerNotificationsService)
  .constant("bloggerBaseUrl", BASE_URL)
  .config(config)
  .run([
    "bloggerNotifications",
    (bloggerNotifications: BloggerNotificationsService) =>
      bloggerNotifications.show(),
  ]).name;
