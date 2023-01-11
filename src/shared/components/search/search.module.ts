import "./brief-result.scss";
import "./facet.scss";

import { FullViewModule } from "./full-view";
import { SearchBarModule } from "./search-bar";
import { SearchResultModule } from "./search-result";
import { TopbarModule } from "./topbar";

export const SearchModule = angular.module("search", [
  FullViewModule,
  SearchBarModule,
  SearchResultModule,
  TopbarModule,
]).name;
