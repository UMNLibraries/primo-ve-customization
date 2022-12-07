import { IllModule } from "../ill.module";
import { IllRequestsComponent } from "./ill-requests.component";
const MAX_REQUESTS_TO_DISPLAY = new IllRequestsComponent.controller()
  .maxDisplay;
const NO_REQUEST_MSG = "There are no requests";

describe("ILL Requests Component", () => {
  let element, scope, $q, $compile, $window, illiadService, requests;

  beforeEach(() => {
    angular.mock.module(IllModule);
    angular.mock.module(($compileProvider) => {
      $compileProvider.directive("translate", fakeTranslateDirective);
    });
    angular.mock.inject(($injector) => {
      scope = $injector.get("$rootScope").$new();
      illiadService = $injector.get("illiad");
      $compile = $injector.get("$compile");
      $window = $injector.get("$window");
      $q = $injector.get("$q");
    });
  });

  it("should have a clickable title", () => {
    stubRequests(0);
    spyOn($window, "open");

    initializeComponent();

    const title = element.find("h2");
    title.triggerHandler("click");
    expect($window.open).toHaveBeenCalledWith(
      illiadService.getRequestPageUrl(),
      "_blank"
    );
  });

  it("should list articles", () => {
    const requestCount = 2;
    stubRequests(requestCount);

    initializeComponent();

    const listItems = element.find("md-list-item");
    expect(listItems.length).toEqual(requestCount);
  });

  it("should link to ILLiad requests", () => {
    const requestCount = 2;
    stubRequests(requestCount);
    spyOn($window, "open");

    initializeComponent();

    const listItems = element.find("md-list-item");
    for (let i = 0; i < requestCount; i++) {
      const request = requests[i];
      listItems[i].click();
      expect($window.open).toHaveBeenCalledWith(
        illiadService.getRequestPageUrl(request.txnNum),
        "_blank"
      );
    }
  });

  it("should display a link to ILLiad when then number of requests exceeds the display threshold", () => {
    const requestCount = MAX_REQUESTS_TO_DISPLAY + 1;
    stubRequests(requestCount);
    spyOn($window, "open");

    initializeComponent();

    const listItems = element.find("md-list-item");
    expect(listItems.length).toEqual(MAX_REQUESTS_TO_DISPLAY);
    const button = element.find("md-button");
    expect(button.text().trim()).toEqual(`View all ${requestCount} requests`);
    button.triggerHandler("click");
    expect($window.open).toHaveBeenCalledWith(
      illiadService.getRequestPageUrl(),
      "_blank"
    );
  });

  it("should display a message if there are no requests", () => {
    const requestCount = 0;
    stubRequests(requestCount);

    initializeComponent();

    const content = element.text().trim();
    expect(content).toContain(NO_REQUEST_MSG);
  });

  function fakeTranslateDirective() {
    return {
      restrict: "A",
      link(scope, element, attrs) {
        if (attrs.translate === "nui.overview.norequests") {
          element.text(NO_REQUEST_MSG);
        }
      },
    };
  }

  function initializeComponent() {
    const html = "<ill-requests></ill-requests>";
    element = $compile(html)(scope);
    scope.$apply();
  }

  /**
   * @param {number} n number of articles to create
   */
  function stubRequests(n = 1) {
    requests = Array.from({ length: n }, (_, i) => ({
      txnNum: i,
      title: `Tets Title ${i}`,
      author: `Test Author ${0}`,
    }));
    spyOn(illiadService, "getRequests").and.returnValue($q.resolve(requests));
  }
});
