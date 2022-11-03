import BloggerNotifications from './blogger-notifications/blogger-notifications.module';
import Config from './config/config.module';

export default angular
  .module('services', [
    BloggerNotifications,
    Config,
  ])
  .name;
