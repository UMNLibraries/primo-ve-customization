import { Observer } from "./observer.model";
import { ShibAuthEventsService } from "./shib-auth-events.service";
import template from "./shib-auth.html";

class ShibAuthController implements ng.IController {
  private src: string;
  private authenticationObserver: Observer;
  private timer: ng.IPromise<void>;
  public onAuth: () => void; // output binding

  static $inject = [
    "shibAuthHost",
    "shibAuthTarget",
    "shibAuthEvents",
    "$sce",
    "$element",
    "$timeout",
  ];
  constructor(
    host: string,
    target: string,
    private shibAuthEvents: ShibAuthEventsService,
    $sce: ng.ISCEService,
    private $element: ng.IAugmentedJQuery,
    private $timeout: ng.ITimeoutService
  ) {
    this.src = $sce.trustAsResourceUrl(
      `https://${host}/Shibboleth.sso/Login?isPassive=true&target=${encodeURIComponent(
        target
      )}`
    );
  }

  $onInit() {
    this.authenticationObserver = () => this.handleAuthentication();
    this.shibAuthEvents.addObserver(this.authenticationObserver);
    this.timer = this.$timeout(() => this.removeIframe(), 5000);
  }

  handleAuthentication() {
    this.onAuth();
    this.shibAuthEvents.removeObserver(this.authenticationObserver);
    this.removeIframe();
  }

  removeIframe() {
    const iframe = this.$element.find("iframe")[0];
    if (iframe) iframe.remove();
  }

  $onDestroy() {
    this.shibAuthEvents.removeObserver(this.authenticationObserver);
    this.$timeout.cancel(this.timer);
  }
}

export const ShibAuthComponent: ng.IComponentOptions = {
  bindings: {
    onAuth: "&",
  },
  controller: ShibAuthController,
  template: template,
  transclude: true,
};
