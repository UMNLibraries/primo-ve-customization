const mqHandler = {
  get(target: object, prop: string, reciver: unknown): boolean {
    if (prop === "xs") {
      return true;
    }
    return Reflect.get(target, prop, reciver);
  },
};

/**
 * Patch the parent controller's mediaQueries object with a proxy that always
 * returns true for the smallest viewport size. This has the effect of making
 * the problem report form always use the mobile (full screen) style.
 */
class PrmReportProblemAfterController implements ng.IController {
  private parentCtrl: ng.IController;

  $onInit() {
    this.overrideMediaQueries();
  }

  private overrideMediaQueries(): void {
    const mqTarget = this.parentCtrl.mediaQueries;
    const mqProxy = new Proxy(mqTarget, mqHandler);
    this.parentCtrl.mediaQueries = mqProxy;
  }
}

export const PrmReportProblemAfterComponent = {
  controller: PrmReportProblemAfterController,
  bindings: { parentCtrl: "<" },
};
