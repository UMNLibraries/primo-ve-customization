import BloggerNotifications from './blogger-notifications.service';

const BASE_URL = 'https://umnprimonotifications.blogspot.com';

export default angular
  .module('bloggerNotifications', [])
  .service('bloggerNotifications', BloggerNotifications)
  .constant('bloggerBaseUrl', BASE_URL)
  .config(['$sceDelegateProvider', 'bloggerBaseUrl',
    ($sceDelegateProvider: ng.ISCEDelegateProvider, bloggerBaseUrl: string) => {
      let trustedUrls = $sceDelegateProvider.trustedResourceUrlList();
      trustedUrls.push(`${bloggerBaseUrl}**`);
      $sceDelegateProvider.trustedResourceUrlList(trustedUrls);
    }])
  .run(['bloggerNotifications', (bloggerNotifications: BloggerNotifications) =>
    bloggerNotifications.show()])
  .name;


