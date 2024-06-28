class PrmFacetAfterController implements ng.IController {
  private parentCtrl: ng.IController;
  static $inject = ["$element", "$scope", "$compile", "$timeout"];
  constructor(
    private $element: ng.IAugmentedJQuery,
    private $scope: ng.IScope,
    private $compile: ng.ICompileService,
    private $timeout: ng.ITimeoutService
  ) {}

  $onInit() {
    this.$timeout(() => this.injectExcludeToggle());
  }

  injectExcludeToggle() {
    const template =
      "<exclude-beyond-toggle facet-ctrl=$ctrl.parentCtrl></exclude-beyond-toggle>";
    this.$element
      .parent()
      .find("div")
      .children()
      .eq(2)
      .append(this.$compile(template)(this.$scope));
  }
}

export const PrmFacetAfterComponent: ng.IComponentOptions = {
  controller: PrmFacetAfterController,
  bindings: { parentCtrl: "<" },
};
