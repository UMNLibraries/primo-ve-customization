import { Analytics } from "@src/shared/services/analytics";
import { QpointChatService } from "./qpoint-chat.service";

showChatOnClick.$inject = ["qpointChat", "analytics"];
export function showChatOnClick(
  qpointChat: QpointChatService,
  analytics: Analytics
): ng.IDirective {
  return {
    restrict: "A",
    link(
      _$scope: ng.IScope,
      $element: ng.IAugmentedJQuery,
      $attrs: ng.IAttributes
    ) {
      $element.on("click", () => {
        analytics.trackEvent("Custom Links", "Chat Click");
        qpointChat.showChatDialog($attrs.url);
      });
    },
  };
}
