import "./primo-explore.scss";

import { IconModule } from "./icon";
import { SearchModule } from "./search";
import { AccountModule } from "./account";
import { CollectionDiscoveryModule } from "./collection-discovery";

export const ComponentsModule = angular.module("components", [
  AccountModule,
  IconModule,
  SearchModule,
  CollectionDiscoveryModule,
]).name;
