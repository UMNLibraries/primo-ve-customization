class PrmSkipToAfterController {
  $onInit() {
    const skipLinksObject = this.parentCtrl.skipToService.skipLinksObject;
    this.removeMainMenuLinks(skipLinksObject);
  }

  removeMainMenuLinks(skipLinksObject) {
    const states = Object.getOwnPropertyNames(skipLinksObject);
    states.forEach(
      (stateName) =>
        (skipLinksObject[stateName] = skipLinksObject[stateName].filter(
          (link) => link !== "mainMenu"
        ))
    );
  }
}

export default {
  bindings: { parentCtrl: "<" },
  controller: PrmSkipToAfterController,
};
