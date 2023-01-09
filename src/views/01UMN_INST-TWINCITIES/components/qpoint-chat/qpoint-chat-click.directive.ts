import { GoogleAnalyticsService } from "../../../../shared/services/google-analytics/google-analytics.service";
import { QpointChatService } from "./qpoint-chat.service";

showChatOnClick.$inject = ["qpointChat", "googleAnalytics"];
export function showChatOnClick(
  qpointChat: QpointChatService,
  googleAnalytics: GoogleAnalyticsService
): ng.IDirective {
  return {
    restrict: "A",
    link(
      _$scope: ng.IScope,
      $element: ng.IAugmentedJQuery,
      _$attrs: ng.IAttributes
    ) {
      $element.on("click", () => {
        googleAnalytics.trackEvent("Custom Links", "Chat Click");
        qpointChat.showChatDialog();
      });
    },
  };
}
