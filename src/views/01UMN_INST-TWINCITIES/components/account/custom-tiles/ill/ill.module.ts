import { IlliadService } from "./illiad.service";
import { IllRequestsComponent } from "./ill-requests/ill-requests.component";
import { IllArticlesComponent } from "./ill-articles/ill-articles.component";
import { IllAccountLinkComponent } from "./ill-account-link/ill-account-link.component";

export const IllModule = angular
  .module("ill", [])
  .constant("illiadEnabled", false)
  .service("illiad", IlliadService)
  .component("illRequests", IllRequestsComponent)
  .component("illArticles", IllArticlesComponent)
  .component("illAccountLink", IllAccountLinkComponent).name;
