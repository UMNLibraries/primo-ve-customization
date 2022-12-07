import Icon from "./icon/icon.module";
import { SearchModule } from "./search";
import { AccountModule } from "./account";

export default angular.module("components", [AccountModule, Icon, SearchModule])
  .name;
