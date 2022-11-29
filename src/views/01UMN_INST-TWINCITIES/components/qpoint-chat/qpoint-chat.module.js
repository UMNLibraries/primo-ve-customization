import "./qpoint-chat.scss";
import QpointChat from "./qpoint-chat.service";
import ShowChatOnClick from "./qpoint-chat-click.directive";

export default angular
  .module("qpointChat", [])
  .service("qpointChat", QpointChat)
  .directive("showChatOnClick", ShowChatOnClick).name;
