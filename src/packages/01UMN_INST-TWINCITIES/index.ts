// NOTE for future: lodash (_) may be available globally 
//
import './css/foo.css';
import './css/bar.css';

import { loadCentralPackage } from '../../util/load';

loadCentralPackage().then(() => 
  angular.module('viewCustom', ['centralCustom']));

