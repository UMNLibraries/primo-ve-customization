import { CollectionDiscoveryModule } from "./collection-discovery.module";
import { View } from "@src/view-code";

interface PrmGalleryCollectionController extends ng.IController {
  isGalleryLobby: boolean;
  $element: jasmine.SpyObj<ng.IAugmentedJQuery>;
  collection: {
    library: {
      value: string;
    };
  };
}

describe("prmGalleryCollectionAfterComponent", () => {
  let $componentController: ng.IComponentControllerService,
    parentCtrl: PrmGalleryCollectionController,
    ctrl: ng.IController;

  beforeEach(() => {
    angular.mock.module(CollectionDiscoveryModule);
    angular.mock.inject(($injector) => {
      $componentController = $injector.get("$componentController");
    });
    parentCtrl = {
      $element: jasmine.createSpyObj("$element", ["remove"]),
      isGalleryLobby: true,
      collection: {
        library: { value: null },
      },
    };
  });

  [
    { view: View.TWINCITIES, library: "MBRIG" },
    { view: View.TWINCITIES, library: "CUMC" },
    { view: View.TWINCITIES, library: "DUMD" },
    { view: View.DULUTH, library: "MBRIG" },
    { view: View.DULUTH, library: "CUMC" },
    { view: View.DULUTH, library: "TWILS" },
    { view: View.MORRIS, library: "DUMD" },
    { view: View.MORRIS, library: "CUMC" },
    { view: View.MORRIS, library: "TWILS" },
    { view: View.CROOKSTON, library: "DUMD" },
    { view: View.CROOKSTON, library: "MBRIG" },
    { view: View.CROOKSTON, library: "TWILS" },
  ].forEach(({ view, library }) => {
    it(`removes itself from the ${view} view when its library is ${library}`, () => {
      parentCtrl.collection.library.value = library;
      ctrl = $componentController(
        "prmGalleryCollectionAfter",
        { view },
        { parentCtrl }
      );
      ctrl.$onInit();
      expect(parentCtrl.$element.remove).toHaveBeenCalled();
    });
  });

  [
    { view: View.TWINCITIES, library: "TWILS" },
    { view: View.TWINCITIES, library: "ZMLAC" },
    { view: View.DULUTH, library: "DUMD" },
    { view: View.MORRIS, library: "MBRIG" },
    { view: View.CROOKSTON, library: "CUMC" },
  ].forEach(({ view, library }) => {
    it(`remains in the ${view} view when its library is ${library}`, () => {
      parentCtrl.collection.library.value = library;
      ctrl = $componentController(
        "prmGalleryCollectionAfter",
        { view },
        { parentCtrl }
      );
      ctrl.$onInit();
      expect(parentCtrl.$element.remove).not.toHaveBeenCalled();
    });
  });
});
