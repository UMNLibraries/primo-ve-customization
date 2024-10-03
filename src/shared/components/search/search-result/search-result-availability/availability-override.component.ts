/**
 * Overrides the calculated availability message for specific data sources.
 */
class AvailabilityOverrideController {
  private parentCtrl: ng.IComponentController;

  $onInit() {
    const dataSource = this.parentCtrl.result.pnx.display.source?.[0];
    if (dataSource === "archivesspace")
      this.availability = this.translate("umn.fulldisplay.linktocollguide");
  }

  translate(code: string): string {
    return this.parentCtrl.$translate.instant(code);
  }

  set availability(msg: string) {
    this.parentCtrl.handleDueDate = () => msg;
  }
}

export const AvailabilityOverrideComponent = {
  require: {
    parentCtrl: "^prmSearchResultAvailabilityLine",
  },
  controller: AvailabilityOverrideController,
};
