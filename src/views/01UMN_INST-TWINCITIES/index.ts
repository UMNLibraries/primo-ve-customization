import 'promise-polyfill/src/polyfill';

//import { loadCentralPackage } from '../../util/load';

/*
loadCentralPackage().then(() => 
  angular.module('viewCustom', ['centralCustom']));

 */


import Shared from '../../shared/index';
//angular.module('viewCustom', ['centralCustom']);
angular.module('viewCustom', [Shared]);

