import "./qpoint-chat.scss";
import { QpointChatService } from "./qpoint-chat.service";
import { showChatOnClick } from "./qpoint-chat-click.directive";

export const QuestionPointModule = angular
  .module("questionPoint", [])
  .service("qpointChat", QpointChatService)
  .directive("showChatOnClick", showChatOnClick).name;
