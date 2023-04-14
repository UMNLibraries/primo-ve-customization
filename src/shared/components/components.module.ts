import "./primo-explore.scss";
import "./report-problem.scss";
import "./icon.scss";

import { SearchModule } from "./search";
import { AccountModule } from "./account";
import { CollectionDiscoveryModule } from "./collection-discovery";

export const ComponentsModule = angular.module("components", [
  AccountModule,
  SearchModule,
  CollectionDiscoveryModule,
]).name;
