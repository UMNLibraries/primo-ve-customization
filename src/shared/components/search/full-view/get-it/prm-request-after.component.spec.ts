import { GetItModule } from "./get-it.module";
import {
  FormData,
  FormField,
  PrmRequestAfterController,
} from "./prm-request-after.component";

describe("prmRequestAfterComponent", () => {
  let $componentController: ng.IComponentControllerService;
  let ctrl: PrmRequestAfterController;
  const commentField: FormField = {
    key: "comment",
    mandatory: false,
    label: "",
    uiType: "text",
  };
  const parentCtrl: ng.IController = {
    form: [commentField],
    onFormInputChange: function () {},
  };

  beforeEach(() => {
    angular.mock.module(GetItModule);
    angular.mock.inject(($injector) => {
      $componentController = $injector.get("$componentController");
    });
    ctrl = $componentController("prmRequestAfter", null, {
      parentCtrl: parentCtrl,
    });
    commentField.label = ctrl.defaultCommentLabel;
  });

  it("replaces the parent controller's form change handler", () => {
    const originalFn = parentCtrl.onFormInputChange;
    ctrl.$onInit();
    expect(parentCtrl.onFormInputChange).not.toBe(originalFn);
  });

  it("calls the original handler after the custom handler", () => {
    const originalFn = spyOn(parentCtrl, "onFormInputChange");
    ctrl.$onInit();
    ctrl.customFormChangeHandler(null, null);
    expect(originalFn).toHaveBeenCalled();
  });

  it("makes the comment field mandatory when home delivery is selected", () => {
    const newFormData: FormData = {
      requestType: "hold",
      pickupLocation: "123456789$$USER_HOME_ADDRESS",
    };
    ctrl.$onInit();
    ctrl.customFormChangeHandler(newFormData, null);
    expect(commentField.mandatory).toBeTrue;
    expect(commentField.label).toEqual(ctrl.customCommentLabel);
  });

  it("hides the comment field by default", () => {
    const newFormData: FormData = {
      requestType: "hold",
    };
    ctrl.$onInit();
    ctrl.customFormChangeHandler(newFormData, null);
    expect(commentField.uiType).toEqual("hidden");
  });
});
