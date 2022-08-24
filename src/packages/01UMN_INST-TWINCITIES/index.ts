// NOTE for future: lodash (_) may be available globally 
//
import './css/foo.css';
import './css/bar.css';

import { loadCentralPackage } from '../../primo-view';

loadCentralPackage().then(() => 
  angular.module('viewCustom', ['centralCustom']));

