import { Observer } from "./observer.model";

export class ShibAuthEventsService {
  observers: Observer[] = [];

  static $inject = ["shibAuthExpectedMsg", "$window"];
  constructor(
    private expectedMsg: string,
    private $window: ng.IWindowService
  ) {}

  init() {
    this.$window.addEventListener("message", (event) => {
      if (event.data === this.expectedMsg) {
        this._notifyObservers();
      }
    });
  }

  addObserver(f: Observer) {
    this.observers.push(f);
  }

  removeObserver(f: Observer) {
    this.observers = this.observers.filter((observer) => observer !== f);
  }

  _notifyObservers() {
    this.observers.forEach((observer) => observer());
  }
}
