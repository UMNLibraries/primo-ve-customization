import notificationTemplate from "./blogger-notification.html";
import "./blogger-notification.scss";
import { BloggerFeed } from "./blogger-feed.model";

export class BloggerNotificationsService {
  private url: string;
  private notificationTimestamp: string;

  static $inject = [
    "$mdToast",
    "$http",
    "$document",
    "bloggerBaseUrl",
    "$cookies",
  ];
  constructor(
    private $mdToast: ng.material.IToastService,
    private $http: ng.IHttpService,
    private $document: ng.IDocumentService,
    bloggerBaseUrl: string,
    private $cookies: ng.cookies.ICookiesService
  ) {
    this.url = `${bloggerBaseUrl}/feeds/posts/default?alt=json-in-script`;
  }

  showToast(msg: string) {
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
        $mdToast: ng.material.IToastService;
        notificationService: BloggerNotificationsService;
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
      .jsonp<BloggerFeed>(this.url, { jsonpCallbackParam: "callback" })
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
