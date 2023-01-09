type SkipLinksObject = {
  [key: string]: string[];
};

class PrmSkipToAfterController implements ng.IController {
  private parentCtrl: ng.IController;

  $onInit() {
    const skipLinksObject: SkipLinksObject =
      this.parentCtrl.skipToService.skipLinksObject;
    this.removeMainMenuLinks(skipLinksObject);
  }

  private removeMainMenuLinks(skipLinksObject: SkipLinksObject): void {
    const states = Object.getOwnPropertyNames(skipLinksObject);
    states.forEach(
      (stateName) =>
        (skipLinksObject[stateName] = skipLinksObject[stateName].filter(
          (link) => link !== "mainMenu"
        ))
    );
  }
}

export const PrmSkipToAfterComponent: ng.IComponentOptions = {
  bindings: { parentCtrl: "<" },
  controller: PrmSkipToAfterController,
};
