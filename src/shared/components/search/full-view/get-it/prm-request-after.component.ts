export interface FormField {
  key: string;
  label: string;
  mandatory: boolean;
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

  $onInit() {
    this.originalFormChangeHandler = this.parentCtrl.onFormInputChange.bind(
      this.parentCtrl
    );
    this.parentCtrl.onFormInputChange = this.customFormChangeHandler.bind(this);
  }

  customFormChangeHandler(newData: FormData, oldData: FormData): void {
    if (this.isHomeDeliverySelected(newData)) {
      this.commentField.mandatory = true;
    } else if (this.commentField?.mandatory) {
      this.commentField.mandatory = false;
    }
    this.originalFormChangeHandler(newData, oldData);
  }

  private isHomeDeliverySelected(formData: FormData): boolean {
    return (
      formData?.requestType === "hold" &&
      formData?.pickupLocation?.endsWith("USER_HOME_ADDRESS")
    );
  }

  private get commentField(): FormField | undefined {
    const formFields = this.parentCtrl.form as FormField[];
    return formFields.find((field) => field.key === "comment");
  }
}

export const PrmRequestAfterComponent: ng.IComponentOptions = {
  controller: PrmRequestAfterController,
  bindings: { parentCtrl: "<" },
};
