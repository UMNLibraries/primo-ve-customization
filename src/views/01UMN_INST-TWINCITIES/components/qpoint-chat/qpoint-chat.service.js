import template from "./qpoint-chat.html";

class QpointChat {
  constructor($mdDialog) {
    this.$mdDialog = $mdDialog;
  }

  showChatDialog() {
    this.$mdDialog.show({
      bindToController: true,
      controllerAs: "$ctrl",
      locals: {
        $mdDialog: this.$mdDialog,
      },
      controller: class {
        close() {
          this.$mdDialog.hide();
        }
      },
      template: template,
    });
  }
}

QpointChat.$inject = ["$mdDialog"];

export default QpointChat;
