/**
 * Appends content to the end of the My Account Overview grid.
 *
 * This component (element directive) should be placed in any of the
 * prm-{tile}-overview-after components as a child element. For example:
 *  <prm-loans-overview-after>
 *    <custom-tiles></custom-tiles>
 *  </prm-loans-overview-after>
 *
 */
class InjectCustomTilesController {
  static $inject = ["$scope", "$compile", "$element"];
  constructor(
    private $scope: ng.IScope,
    private $compile: ng.ICompileService,
    private $element: ng.IAugmentedJQuery
  ) {}

  getAccountOverviewGrid() {
    return this.$element.parent().parent().parent();
  }

  appendCustomTiles() {
    const unbindWatch = this.$scope.$watch(
      () => this.getAccountOverviewGrid(),
      (accountOverviewGrid) => {
        if (accountOverviewGrid.hasOwnProperty("length")) {
          accountOverviewGrid.append(this.template);
          unbindWatch();
        }
      }
    );
  }

  get template() {
    const html = "<courses></courses>";
    return this.$compile(html)(this.$scope);
  }

  $postLink() {
    this.appendCustomTiles();
  }
}

export const InjectCustomTilesComponent = {
  controller: InjectCustomTilesController,
};
