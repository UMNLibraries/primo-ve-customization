import './color-theme/generated-theme.css';

import Components from './components/components.module';
import Services from './services/services.module';
import Filters from './filters/filters.module';


export default angular.module('centralCustom', [
  Services,
  Filters,
  Components,
]).name;

