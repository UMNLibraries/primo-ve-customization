import { IconModule } from "./icon";
import { SearchModule } from "./search";
import { AccountModule } from "./account";

export default angular.module("components", [
  AccountModule,
  IconModule,
  SearchModule,
]).name;
