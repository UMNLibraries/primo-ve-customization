import 'promise-polyfill/src/polyfill';

import './css/empty.css';
import { loadCentralPackage } from '../../util/load';

loadCentralPackage().then(() => 
  angular.module('viewCustom', ['centralCustom']));

