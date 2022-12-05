class ShibAuthEvents {
  constructor(expectedMsg, $window) {
    this.$window = $window;
    this.expectedMsg = expectedMsg;
    this.observers = [];
  }

  init() {
    this.$window.addEventListener("message", (event) => {
      if (event.data === this.expectedMsg) {
        this._notifyObservers();
      }
    });
  }

  addObserver(f) {
    this.observers.push(f);
  }

  removeObserver(f) {
    this.observers = this.observers.filter((observer) => observer !== f);
  }

  _notifyObservers() {
    this.observers.forEach((observer) => observer());
  }
}

ShibAuthEvents.$inject = ["shibAuthExpectedMsg", "$window"];

export default ShibAuthEvents;
