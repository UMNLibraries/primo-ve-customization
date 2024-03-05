class PrmNgrsResultsButtonAfterController implements ng.IController {
  private parentCtrl: ng.IController;

  $onInit(): void {
    this.disableStillNotFoundLink();
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
}

export const PrmNgrsResultsButtonAfterComponent: ng.IComponentOptions = {
  controller: PrmNgrsResultsButtonAfterController,
  bindings: { parentCtrl: "<" },
};
