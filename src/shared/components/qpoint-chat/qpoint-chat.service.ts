import { View, ViewCode } from "@src/view-code";
import template from "./qpoint-chat.html";

export class QpointChatService {
  private url: string;
  static $inject = ["$mdDialog", "$sce", "view"];
  constructor(
    private $mdDialog: ng.material.IDialogService,
    private $sce: ng.ISCEService,
    private view: ViewCode
  ) {
    switch (this.view) {
      case View.DULUTH:
        this.url = this.$sce.trustAsResourceUrl(
          "https://libanswers.d.umn.edu/chat/widget/5f32aa274dea76fa84de129dc49196b6"
        );
        break;
      case View.TWINCITIES:
        this.url = this.$sce.trustAsResourceUrl(
          "https://askmn.libanswers.com/chat/widget/b676f7763ee8962e9d1c686593b6b5bd614abdc3b3a51c9a4ec39120365a52a6"
        );
        break;
      default:
        this.url = "";
    }
  }

  showChatDialog() {
    this.$mdDialog.show({
      bindToController: true,
      controllerAs: "$ctrl",
      locals: {
        $mdDialog: this.$mdDialog,
        url: this.url,
      },
      controller: function () {
        this.close = function () {
          this.$mdDialog.hide();
        };
      },
      template: template,
    });
  }
}
