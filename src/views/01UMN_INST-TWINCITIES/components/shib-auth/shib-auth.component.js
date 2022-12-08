import template from "./shib-auth.html";

class ShibAuthController {
  static $inject = [
    "shibAuthHost",
    "shibAuthTarget",
    "shibAuthEvents",
    "$sce",
    "$element",
    "$timeout",
  ];
  constructor(host, target, shibAuthEvents, $sce, $element, $timeout) {
    this.shibAuthEvents = shibAuthEvents;
    this.$element = $element;
    this.$timeout = $timeout;
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

export const ShibAuthComponent = {
  bindings: {
    onAuth: "&",
  },
  controller: ShibAuthController,
  template: template,
  transclude: true,
};
