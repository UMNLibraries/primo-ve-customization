import "./primo-explore.scss";
import "./icon.scss";

import { SearchModule } from "./search";
import { AccountModule } from "./account";
import { QuestionPointModule } from "./qpoint-chat";
import { CollectionDiscoveryModule } from "./collection-discovery";
import { ReportProblemModule } from "./report-problem";

export const ComponentsModule = angular.module("components", [
  AccountModule,
  SearchModule,
  QuestionPointModule,
  CollectionDiscoveryModule,
  ReportProblemModule,
]).name;
