import Icon from "./icon/icon.module";
import Search from "./search/search.module";
import { AccountModule } from "./account";

export default angular.module("components", [AccountModule, Icon, Search]).name;
