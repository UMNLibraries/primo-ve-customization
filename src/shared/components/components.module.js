import { IconModule } from "./icon";
import { SearchModule } from "./search";
import { AccountModule } from "./account";

export const ComponentsModule = angular.module("components", [
  AccountModule,
  IconModule,
  SearchModule,
]).name;
