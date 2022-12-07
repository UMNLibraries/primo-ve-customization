import notificationTemplate from "./blogger-notification.html";
import "./blogger-notification.scss";

export class BloggerNotificationsService {
  static $inject = [
    "$mdToast",
    "$http",
    "$document",
    "bloggerBaseUrl",
    "$cookies",
  ];
  constructor($mdToast, $http, $document, bloggerBaseUrl, $cookies) {
    this.$mdToast = $mdToast;
    this.$http = $http;
    this.$document = $document;
    this.$cookies = $cookies;
    this.url = `${bloggerBaseUrl}/feeds/posts/default?alt=json-in-script`;
  }

  showToast(msg) {
    this.$mdToast.show({
      controllerAs: "ctrl",
      bindToController: true,
      autoWrap: false,
      position: "top",
      parent: this.$document[0].getElementsByTagName("html")[0],
      hideDelay: 20000,
      locals: {
        $mdToast: this.$mdToast,
        notificationService: this,
        msg: msg,
      },
      controller: class {
        close() {
          this.$mdToast.hide();
          this.notificationService.markNotificationAsRead();
        }
      },
      template: notificationTemplate,
    });
  }

  markNotificationAsRead() {
    let cookieName = `unmnotification_${this.notificationTimestamp}`;
    let expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 1);
    this.$cookies.put(cookieName, "1", { expires: expireDate });
  }

  notificationIsUnread() {
    let cookieName = `unmnotification_${this.notificationTimestamp}`;
    return this.$cookies.get(cookieName) !== "1";
  }

  show() {
    this.$http
      .jsonp(this.url, { jsonpCallbackParam: "callback" })
      .then((resp) => {
        let entry = resp.data.feed.entry;
        if (entry) {
          let title = entry[0].title.$t;
          let content = entry[0].content.$t;
          this.notificationTimestamp = entry[0].updated.$t;
          if (this.notificationIsUnread()) {
            this.showToast(title + ": " + content);
          }
        }
      });
  }
}
