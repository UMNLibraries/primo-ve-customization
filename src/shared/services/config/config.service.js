import CampusCode from "./campus-code";

/**
 * Configuration service to support feature flagging.
 */
class Config {
  static $inject = ["$window", "$translate", "$q"];
  #translate;
  #appConfig;
  #campus;

  constructor($window, $translate, $q) {
    this.#appConfig = $window.appConfig;
    this.#translate = $translate;
    this.$q = $q;
  }

  get vid() {
    return this.#appConfig["vid"];
  }

  get campus() {
    return (this.#campus ??= Object.values(CampusCode).find((campus) =>
      this.vid.includes(campus)
    ));
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

  getBrowzineConfig() {
    return this.#translate(["umn.browzine.id", "umn.browzine.key"]).then(
      (translations) =>
        Object.entries(translations).reduce(
          (obj, entry) =>
            Object.assign(obj, { [entry[0].split(".").pop()]: entry[1] }),
          {}
        )
    );
  }

  get getItNote() {
    //return this.viewProperties.getValue('umn-get-it-note');
    // TODO
  }
}

export default Config;
