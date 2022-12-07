import { IllAccountLinkComponent } from "./ill-account-link/ill-account-link.component";
//import ILLiad from './illiad.service.js';
//import IllRequests from './ill-requests/ill-requests.component';
//import IllArticles from './ill-articles/ill-articles.component';

export const IllModule = angular
  .module("ill", [])
  .constant("illiadEnabled", false)
  //  .service('illiad', ILLiad)
  //  .component('illRequests', IllRequests)
  //  .component('illArticles', IllArticles)
  .component("illAccountLink", IllAccountLinkComponent).name;
