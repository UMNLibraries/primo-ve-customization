export interface FormField {
  key: string;
  name: string;
  label: string;
  value?: string;
  mandatory?: boolean;
  options?: [
    {
      category: string;
      label: string;
      value: string;
    }
  ];
  events?: {
    onChange?: Function;
  };
}

/**
 * Binds an event listener to the Rapido physical request form's pickup
 * location field. If a user selects "Home Address" the notes field is
 * set to mandatory and its label is changed.
 */
export class PrmGetItRequestAfterController implements ng.IController {
  private parentCtrl: ng.IController;

  constructor() {
    this.findLocationOption = _.memoize(this.findLocationOption);
  }

  $onInit(): void {
    this.locationField.events = {
      onChange: () => this.setMandatoryFields(),
    };
  }

  private setMandatoryFields() {
    if (this.isLocationSelected("Home Address")) {
      this.noteField.mandatory = true;
      this.noteField.label = "umn.almaRequest.homeDeliveryAddress";
    } else if (this.isLocationSelected("Work Address")) {
      this.noteField.mandatory = false;
      this.noteField.label = "umn.almaRequest.workDeliveryAddress";
    } else {
      this.noteField.mandatory = false;
      this.noteField.label = "nui.ngrs.request.note";
    }
  }

  private findLocationOption(label: string) {
    return this.locationField.options.find((o: any) => o.label === label);
  }

  private isLocationSelected(location: string): boolean {
    // The values associated with each label appear to be auto-generated, and
    // it's not clear if they're stable over time. To be safe, we're looking
    // up the values by label here.
    const option = this.findLocationOption(location);
    return this.parentCtrl.formData.myLocation === option.value;
  }

  get locationField(): FormField {
    return this.parentCtrl.locationField;
  }

  get noteField(): FormField {
    return this.parentCtrl.noteField;
  }
}

export const PrmGetItRequestAfterComponent: ng.IComponentOptions = {
  controller: PrmGetItRequestAfterController,
  bindings: { parentCtrl: "<" },
};
