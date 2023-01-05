type SkipLinksObject = {
  [key: string]: string[];
};

class PrmSkipToAfterController {
  private parentCtrl: ng.IComponentController;

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

export const PrmSkipToAfterComponent = {
  bindings: { parentCtrl: "<" },
  controller: PrmSkipToAfterController,
};
