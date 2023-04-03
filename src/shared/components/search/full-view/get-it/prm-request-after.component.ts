export interface FormField {
  key: string;
  label: string;
  mandatory: boolean;
  uiType: "hidden" | "text";
}

export interface FormData {
  requestType?: string;
  [key: string]: any;
}

/**
 * Replaces the parent controller's `onFormInputChange` method with a custom
 * implementation that requires users to provide an address in the comments
 * field when "home delivery" is selected as a pickup location in hold requests
 */
export class PrmRequestAfterController implements ng.IController {
  private parentCtrl: ng.IController;
  private originalFormChangeHandler: Function;
  readonly defaultCommentLabel: string = "almaRequest.comment";
  readonly customCommentLabel: string = "umn.almaRequest.homeDeliveryAddress";

  $onInit() {
    this.originalFormChangeHandler = this.parentCtrl.onFormInputChange.bind(
      this.parentCtrl
    );
    this.parentCtrl.onFormInputChange = this.customFormChangeHandler.bind(this);
  }

  customFormChangeHandler(newData: FormData, oldData: FormData): void {
    if (this.isHoldRequest(newData)) {
      const comment = this.findCommentField();
      comment.uiType = "hidden";
      if (this.isHomeDeliverySelected(newData)) {
        comment.label = this.customCommentLabel;
        comment.mandatory = true;
        comment.uiType = "text";
      } else if (comment?.label === this.customCommentLabel) {
        comment.label = this.defaultCommentLabel;
        comment.mandatory = false;
      }
    }
    this.originalFormChangeHandler(newData, oldData);
  }

  private isHoldRequest(formData: FormData): boolean {
    return formData?.requestType === "hold";
  }

  private isHomeDeliverySelected(formData: FormData): boolean {
    return formData?.pickupLocation?.endsWith("USER_HOME_ADDRESS");
  }

  private findCommentField(): FormField | undefined {
    const formFields = this.parentCtrl.form as FormField[];
    return formFields.find((field) => field.key === "comment");
  }
}

export const PrmRequestAfterComponent: ng.IComponentOptions = {
  controller: PrmRequestAfterController,
  bindings: { parentCtrl: "<" },
};
