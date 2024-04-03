class PrmNgrsResultsButtonAfterController implements ng.IController {
  private parentCtrl: ng.IController;

  static $inject = ["$location"];
  constructor(private $location: ng.ILocationService) {}

  $onInit(): void {
    this.disableStillNotFoundLink();
    this.disableNewspaperExpandLink();
  }

  /**
   * By default, Rapido will display a link to a blank resource sharing
   * request form. This disables the link.
   */
  private disableStillNotFoundLink(): void {
    if (this.parentCtrl.isStillNotFoundRequired()) {
      this.parentCtrl.isRapidoLinksTileRequired = () => false;
    }
  }

  /**
   * The Rapido "expand" link does not make sense in the newspaper search page,
   * as clicking on the link takes the user to a completely different context.
   * Unfortunately, there's no way to disable is with configuration.
   */
  private disableNewspaperExpandLink(): void {
    if (this.$location.path().endsWith("/npsearch")) {
      this.parentCtrl.isRapidoLinksTileRequired = () => false;
    }
  }
}

export const PrmNgrsResultsButtonAfterComponent: ng.IComponentOptions = {
  controller: PrmNgrsResultsButtonAfterController,
  bindings: { parentCtrl: "<" },
};
