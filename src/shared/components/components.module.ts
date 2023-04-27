import "./primo-explore.scss";
import "./report-problem.scss";
import "./icon.scss";

import { SearchModule } from "./search";
import { AccountModule } from "./account";
import { QuestionPointModule } from "./qpoint-chat";
import { CollectionDiscoveryModule } from "./collection-discovery";

export const ComponentsModule = angular.module("components", [
  AccountModule,
  SearchModule,
  QuestionPointModule,
  CollectionDiscoveryModule,
]).name;
