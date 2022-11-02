import BloggerNotifications from './blogger-notifications.service.js';

const BASE_URL = 'https://umnprimonotifications.blogspot.com';

export default angular
  .module('bloggerNotifications', [])
  .service('bloggerNotifications', BloggerNotifications)
  .constant('bloggerBaseUrl', BASE_URL)
  .config(['$sceDelegateProvider', 'bloggerBaseUrl', ($sceDelegateProvider, bloggerBaseUrl) => {
    let urlWhitelist = $sceDelegateProvider.resourceUrlWhitelist();
    urlWhitelist.push(`${bloggerBaseUrl}**`);
    $sceDelegateProvider.resourceUrlWhitelist(urlWhitelist);
  }])
  .run(['bloggerNotifications', bloggerNotifications => bloggerNotifications.show()])
  .name;


