import template from "./qpoint-chat.html";

export class QpointChatService {
  static $inject = ["$mdDialog"];
  constructor(private $mdDialog: ng.material.IDialogService) {}

  showChatDialog() {
    this.$mdDialog.show({
      bindToController: true,
      controllerAs: "$ctrl",
      locals: {
        $mdDialog: this.$mdDialog,
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
