import './color-theme/generated-theme.css';

import Components from './components/components.module';
import Filters from './filters/filters.module';
import Services from './services/services.module';

/**
 * This is functionally similar to the Primo 'centralCustom' 
 * module in that it's intended to be shared among all views.
 */
export default angular.module('shared', [
  Components,
  Filters,
  Services,
]).name;

