showChatOnClick.$inject = ["qpointChat", "googleAnalytics"];
export function showChatOnClick(qpointChat, googleAnalytics) {
  return {
    restrict: "A",
    link($scope, $element, $attrs) {
      $element.on("click", () => {
        googleAnalytics.trackEvent("Custom Links", "Chat Click");
        qpointChat.showChatDialog();
      });
    },
  };
}
