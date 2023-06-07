import "./ill.scss";

import { JwtService } from "./jwt.service";
import { IlliadService } from "./illiad.service";
import { IllRequestsComponent } from "./ill-requests/ill-requests.component";
import { IllArticlesComponent } from "./ill-articles/ill-articles.component";
import { IllAccountLinkComponent } from "./ill-account-link/ill-account-link.component";
import { illiadApiInterceptor } from "./illiad-api.interceptor";

config.$inject = ["illiadEnabled", "$httpProvider"];
function config(illiadEnabled: boolean, $httpProvider: ng.IHttpProvider) {
  if (illiadEnabled) $httpProvider.interceptors.push(illiadApiInterceptor);
}

export const IllModule = angular
  .module("ill", [])
  .constant("illiadEnabled", true)
  .config(config)
  .service("jwtService", JwtService)
  .service("illiad", IlliadService)
  .component("illRequests", IllRequestsComponent)
  .component("illArticles", IllArticlesComponent)
  .component("illAccountLink", IllAccountLinkComponent).name;
