import { ShibAuthModule } from ".";
import { Observer } from "./observer.model";
import { ShibAuthEventsService } from "./shib-auth-events.service";

describe("ShibAuth Component", () => {
  beforeEach(angular.mock.module(ShibAuthModule));

  let element: ng.IAugmentedJQuery,
    scope: ng.IRootScopeService & { callback: Observer },
    controller: ng.IComponentController,
    $compile: ng.ICompileService,
    shibAuthEvents: ShibAuthEventsService;
  const content = "my content";

  beforeEach(() => {
    angular.mock.inject(($injector) => {
      scope = $injector.get("$rootScope").$new();
      $compile = $injector.get("$compile");
      shibAuthEvents = $injector.get("shibAuthEvents");
    });
    scope.callback = jasmine.createSpy("callback");
    let html = `<shib-auth on-auth="callback()"><div>${content}</div></shib-auth>`;
    element = $compile(html)(scope);
    controller = element.controller("shibAuth");
    scope.$apply();
  });

  it("should register a shib auth event observer", () => {
    expect(shibAuthEvents.observers.length).toBe(1);
  });

  it("should remove its event observer once notified", () => {
    controller.authenticationObserver();
    expect(shibAuthEvents.observers.length).toBe(0);
  });

  it("should trigger the on-auth binding once notified", () => {
    controller.authenticationObserver();
    expect(scope.callback).toHaveBeenCalled();
  });

  it("should add a shib host iframe", () => {
    let iframe = element.find("iframe");
    expect(iframe.length).toBe(1);
    expect(iframe.attr("src")).toEqual(controller.src.toString());
  });

  it("should remove the shib host iframe once notified", () => {
    controller.authenticationObserver();
    let iframe = element.find("iframe");
    expect(iframe.length).toBe(0);
  });

  it("should remove its shib auth observer when destroyed", () => {
    expect(shibAuthEvents.observers.length).toBe(1);
    scope.$destroy();
    expect(shibAuthEvents.observers.length).toBe(0);
  });

  it("should transclude content", () => {
    const transcludedElement = element.find("ng-transclude");
    expect(transcludedElement.html()).toContain(content);
  });
});
