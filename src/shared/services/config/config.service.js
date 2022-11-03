import CampusCode from './campus-code';

/**
 * Configuration service to support feature flagging.
 */
class Config {
  static $inject = ['$window'];
  #appConfig;
  #campus;

  constructor($window) {
    this.#appConfig = $window.appConfig;
  }

  get vid() {
    return this.#appConfig['vid'];
  }

  get campus() {
    return this.#campus ??= Object.values(CampusCode)
      .find(campus => this.vid.includes(campus));
  }

  get showCustomAccountTiles() {
    return this.campus === CampusCode.TWINCITIES;
  }

  /**
   * Indicates if the custom ILLiad integration components should display.
   */
  get enableIlliad() {
    // TODO
  }

  get showIllLink() {
    return !this.enableIlliad && this.campus === CampusCode.TWINCITIES;
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

export default Config;
