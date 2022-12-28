import { BloggerFeed } from "./blogger-feed.model";
import { BloggerNotificationsModule } from "./blogger-notifications.module";
import { BloggerNotificationsService } from "./blogger-notifications.service";

describe("BloggerNotifications Service", () => {
  let bloggerNotifications: BloggerNotificationsService,
    $httpBackend: ng.IHttpBackendService,
    $timeout: ng.ITimeoutService,
    $mdToast: ng.material.IToastService,
    url: string;

  const feedPath = "/feeds/posts/default?alt=json-in-script";
  const responseWithoutPost: Partial<BloggerFeed> = { feed: { entry: null } };
  const responseWithPost: BloggerFeed = {
    feed: {
      entry: [
        {
          updated: { $t: "2016-11-12T21:25:30.000Z" },
          title: {
            type: "text",
            $t: "Test Title",
          },
          content: {
            type: "text",
            $t: "This is the content",
          },
        },
      ],
    },
  };

  beforeEach(() => {
    angular.mock.module(BloggerNotificationsModule);
    angular.mock.module("ngMaterial");
    angular.mock.module("ngCookies");
    angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.factory("mdIconDirective", () => {
        return angular.noop;
      });
    });
    angular.mock.inject(($injector) => {
      bloggerNotifications = $injector.get("bloggerNotifications");
      $httpBackend = $injector.get("$httpBackend");
      $timeout = $injector.get("$timeout");
      $mdToast = $injector.get("$mdToast");
      let baseUrl = $injector.get("bloggerBaseUrl");
      url = baseUrl + feedPath + "&callback=JSON_CALLBACK";
      spyOn($mdToast, "show").and.callThrough();
    });
  });

  it("should not display a message if no posts are in the feed", () => {
    $httpBackend.expectJSONP(url).respond(JSON.stringify(responseWithoutPost));
    $httpBackend.flush();
    expect($mdToast.show).not.toHaveBeenCalled();
  });

  it("should display a message if posts are in the feed", () => {
    $httpBackend.expectJSONP(url).respond(JSON.stringify(responseWithPost));
    $httpBackend.flush();
    expect($mdToast.show).toHaveBeenCalled();
  });
});
