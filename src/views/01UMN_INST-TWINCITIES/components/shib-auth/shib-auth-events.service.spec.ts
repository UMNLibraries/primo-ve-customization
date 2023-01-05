import { Observer } from "./observer.model";
import { ShibAuthEventsService } from "./shib-auth-events.service";

describe("ShibAuthEventsService", () => {
  const msg = "my message";
  let $window: ng.IWindowService, shibAuthEvents: ShibAuthEventsService;

  function onMessage(assertionFunc: Observer) {
    $window.addEventListener("message", (event) => {
      if (event.data == msg) assertionFunc();
    });
  }

  beforeEach(() => {
    angular.mock.inject(($injector) => ($window = $injector.get("$window")));
    shibAuthEvents = new ShibAuthEventsService(msg, $window);
    shibAuthEvents.init();
  });

  it("should notify observers when expected message is dispatched", () => {
    const observer = jasmine.createSpy();
    const observer2 = jasmine.createSpy();
    shibAuthEvents.addObserver(observer);
    shibAuthEvents.addObserver(observer2);
    onMessage(() => {
      expect(observer).toHaveBeenCalled();
      expect(observer2).toHaveBeenCalled();
    });
    $window.postMessage(msg, "*");
  });

  it("should add and remove observers", () => {
    expect(shibAuthEvents.observers).toEqual([]);
    let observers = [null, null, null].map(() => jasmine.createSpy());
    observers.forEach((o) => shibAuthEvents.addObserver(o));
    expect(shibAuthEvents.observers.length).toBe(3);
    expect(shibAuthEvents.observers).toEqual(
      jasmine.arrayContaining(observers)
    );
    shibAuthEvents.removeObserver(observers[1]);
    expect(shibAuthEvents.observers.length).toBe(2);
    expect(shibAuthEvents.observers).not.toEqual(
      jasmine.arrayContaining([observers[1]])
    );
    expect(shibAuthEvents.observers).toEqual(
      jasmine.arrayContaining([observers[0], observers[2]])
    );
  });
});
