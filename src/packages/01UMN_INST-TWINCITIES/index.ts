import 'promise-polyfill/src/polyfill';

// NOTE for future: lodash (_) may be available globally 

import './css/empty.css';
import { loadCentralPackage } from '../../util/load';

loadCentralPackage().then(() => 
  angular.module('viewCustom', ['centralCustom']));

