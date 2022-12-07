import { ILLiadService } from "./illiad.service.js";
import { IllRequestsComponent } from "./ill-requests/ill-requests.component";
import { IllArticlesComponent } from "./ill-articles/ill-articles.component";
import { IllAccountLinkComponent } from "./ill-account-link/ill-account-link.component";

export const IllModule = angular
  .module("ill", [])
  .constant("illiadEnabled", false)
  .service("illiad", ILLiadService)
  .component("illRequests", IllRequestsComponent)
  .component("illArticles", IllArticlesComponent)
  .component("illAccountLink", IllAccountLinkComponent).name;
