import { NgrsModule } from "./ngrs.module";
import { PrmGetItRequestAfterController } from "./prm-get-it-request-after.component";

describe("prmGetItRequestAfterComponent", () => {
  let $componentController: ng.IComponentControllerService;
  let $element: ng.IAugmentedJQuery;
  let parentElement: jasmine.SpyObj<ng.IAugmentedJQuery>;
  let ctrl: PrmGetItRequestAfterController;
  const parentCtrl: ng.IController = {
    formData: {},
    noteField: {
      label: "nui.ngrs.request.note",
      mandatory: false,
    },
    locationField: {
      options: [
        { label: "Library A", value: "1" },
        { label: "Library B", value: "2" },
        { label: "Library C", value: "3" },
        { label: "Home Address", value: "4" },
        { label: "Work Address", value: "5" },
      ],
    },
  };

  beforeEach(() => {
    angular.mock.module(NgrsModule);
    angular.mock.inject(($injector) => {
      $componentController = $injector.get("$componentController");
      $element = angular.element("<dummy></dummy>");
      parentElement = jasmine.createSpyObj(null, ["prepend"]);
      spyOn($element, "parent").and.returnValue(parentElement);
    });
    ctrl = $componentController(
      "prmGetItRequestAfter",
      { $element },
      {
        parentCtrl: parentCtrl,
      }
    );
    parentCtrl.formData.myLocation = "1";
  });

  it("adds an event listener to the location field", () => {
    ctrl.$onInit();
    expect(parentCtrl.locationField.events.onChange).toBeDefined();
  });

  it("enables a mandatory address field when Home Address is selected", () => {
    ctrl.$onInit();
    parentCtrl.formData.myLocation = "4";
    parentCtrl.locationField.events.onChange();
    expect(parentCtrl.noteField.mandatory).toBeTrue();
    expect(parentCtrl.noteField.label).toEqual(
      "umn.almaRequest.homeDeliveryAddress"
    );
  });

  it("enables an optional address field when Work Address is selected", () => {
    ctrl.$onInit();
    parentCtrl.formData.myLocation = "5";
    parentCtrl.locationField.events.onChange();
    expect(parentCtrl.noteField.mandatory).toBeFalse();
    expect(parentCtrl.noteField.label).toEqual(
      "umn.almaRequest.workDeliveryAddress"
    );
  });

  it("disables a mandatory address field by default", () => {
    ctrl.$onInit();
    parentCtrl.formData.myLocation = "1";
    parentCtrl.locationField.events.onChange();
    expect(parentCtrl.noteField.mandatory).toBeFalse();
    expect(parentCtrl.noteField.label).toEqual("nui.ngrs.request.note");
  });

  it("sets the parent controller's default location to null", () => {
    ctrl.$onInit();
    expect(parentCtrl.getDefaultValue()).toBeNull();
  });

  it("adds get-it notes to physical requests", () => {
    parentCtrl.isdigitaloffer = false;
    ctrl.$onInit();
    const addedElement: any = parentElement.prepend.calls.first().args[0];
    expect((addedElement[0] as HTMLElement).tagName.toLowerCase()).toBe(
      "get-it-note"
    );
  });

  it("does not add get-it notes to non-physical requests", () => {
    parentCtrl.isdigitaloffer = true;
    ctrl.$onInit();
    expect(parentElement.prepend).not.toHaveBeenCalled();
  });
});
