import "./brief-result.scss";

import FullView from "./full-view/full-view.module";
import SearchBar from "./search-bar/search-bar.module";
import SearchResult from "./search-result/search-result.module";
import { TopbarModule } from "./topbar";

export default angular.module("search", [
  FullView,
  SearchBar,
  SearchResult,
  TopbarModule,
]).name;
