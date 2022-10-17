if (location.search.includes('vid=01UMN_INST:CENTRAL_PACKAGE')) {
  location.href = location.toString().replace('vid=01UMN_INST:CENTRAL_PACKAGE', 
                                              'vid=01UMN_INST:TWINCITIES');
}

//import globals from './globals';

import './color-theme/colors.css';
import Components from './components/components.module';
import Filters from './filters/filters.module';


angular.module('centralCustom', [
  Components, 
  Filters,
]);

