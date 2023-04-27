import template from "./qpoint-chat.html";

export class QpointChatService {
  static $inject = ["$mdDialog", "$sce"];
  constructor(
    private $mdDialog: ng.material.IDialogService,
    private $sce: ng.ISCEService
  ) {}

  showChatDialog(url: string) {
    this.$mdDialog.show({
      bindToController: true,
      controllerAs: "$ctrl",
      locals: {
        $mdDialog: this.$mdDialog,
        $sce: this.$sce,
      },
      controller: function () {
        this.url = this.$sce.trustAsResourceUrl(url);
        this.close = function () {
          this.$mdDialog.hide();
        };
      },
      template: template,
    });
  }
}
