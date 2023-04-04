/**
 * Removes thumbnail URLs from the description field in Morris Digital Well
 * records.
 */
class PrmServiceDetailsAfterController implements ng.IController {
  private parentCtrl: ng.IController;

  $onInit() {
    if (this.origSourceId.startsWith("oai:digitalcommons.morris.umn.edu")) {
      this.description.forEach((value, index, description) => {
        if (value.endsWith("thumbnail.jpg")) {
          description[index] = "";
        }
      });
    }
  }

  private get origSourceId(): string {
    return this.parentCtrl.item.pnx.control?.originalsourceid[0] ?? "";
  }

  private get description(): string[] {
    return this.parentCtrl.item.pnx.display.description ?? [];
  }
}

export const PrmServiceDetailsAfterComponent: ng.IComponentOptions = {
  controller: PrmServiceDetailsAfterController,
  bindings: { parentCtrl: "<" },
};
