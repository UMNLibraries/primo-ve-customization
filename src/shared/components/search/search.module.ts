import "./actions/citation.scss";
import "./actions/export-all.scss";
import "./brief-result.scss";
import "./facet.scss";

import { FullViewModule } from "./full-view";
import { SearchBarModule } from "./search-bar";
import { SearchResultModule } from "./search-result";
import { TopbarModule } from "./topbar";
import { FacetModule } from "./facet";

export const SearchModule = angular.module("search", [
  FullViewModule,
  SearchBarModule,
  SearchResultModule,
  TopbarModule,
  FacetModule,
]).name;
