import { View, ViewCode } from "@src/view-code";

/**
 * Removes a collection from the collection discovery landing page if it does
 * not belong to the current campus view.
 */
class PrmGalleryCollectionAfterController {
  private parentCtrl: ng.IController;
  static $inject = ["view"];
  constructor(private view: ViewCode) {}

  get isGalleryLobby(): boolean {
    return this.parentCtrl.isGalleryLobby;
  }

  get libraryCode(): string {
    return this.parentCtrl.collection.library.value;
  }

  get belongsInView(): ViewCode {
    const firstChar = this.libraryCode.charAt(0);
    switch (firstChar) {
      case "M":
        return View.MORRIS;
      case "D":
        return View.DULUTH;
      case "C":
        return View.CROOKSTON;
      default:
        return View.TWINCITIES;
    }
  }

  $onInit() {
    if (this.isGalleryLobby && this.view !== this.belongsInView) {
      console.debug(
        "Removing collection that does not belong in this view: ",
        this.parentCtrl.collection
      );
      this.parentCtrl.$element.remove();
    }
  }
}

export const PrmGalleryCollectionAfterComponent: ng.IComponentOptions = {
  controller: PrmGalleryCollectionAfterController,
  bindings: { parentCtrl: "<" },
};
