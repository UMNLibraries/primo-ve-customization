import CampusCode from './campus-code';

/**
 * Configuration service to support feature flagging.
 */
class Config {
  constructor($window) {
    this.appConfig = $window.appConfig;
  }

  get institution() {
    return this.appConfig['primo-view']['institution']['institution-code'];
  }

  get institutionLibraryCodes() {
    return Object.keys(this.appConfig['institution-libraries']);
  }

  get showCustomAccountTiles() {
    return this.institution === CampusCode.TWINCITIES;
  }

  /**
   * Indicates if the custom ILLiad integration components should display.
   */
  get enableIlliad() {
    // TODO
  }

  get showIllLink() {
    return !this.enableIlliad && this.institution === CampusCode.TWINCITIES;
  }

  get browzine() {
    //const id = this.viewProperties.getValue('umn-browzine-id');
    //const key = this.viewProperties.getValue('umn-browzine-key');
    //return { id, key };
    // TODO
  }

  get getItNote() {
    //return this.viewProperties.getValue('umn-get-it-note');
    // TODO
  }
}

Config.$inject = ['$window'];

export default Config;
