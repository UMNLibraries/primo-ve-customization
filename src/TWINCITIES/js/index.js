// NOTE for future: lodash (_) may be available globally 
//
import '../css/foo.css';
import '../css/bar.css';


/**
 * I wonder if we could host host the central pkg javascript & css in a VE view
 * named "CENTRAL_PACKAGE"...
 *
 */
const centralPackageUrl = '/discovery/custom/01UMN_INST-CENTRAL_PACKAGE/js/custom.js';


//TODO: maybe use SystemJS for this?
// (might need to polyfill Promise or just use a onload callback instead) 
const loadScript = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    document.head.appendChild(script);
    script.onload = resolve;
    script.onerror = reject;
    script.async = true;
    script.src = centralPackageUrl;
  });
};

loadScript().then(() => 
  angular.module('viewCustom', ['centralCustom']).run(() => console.log('LOCAL')));

/*
// this might not work without bootstrapping...
angular.module('main', ['angularLoad'])
  .run(['angularLoad', angularLoad => {
    angularLoad.loadScript(centralPackageUrl).then(() => {
      angular.module('viewCustom', ['centralCustom']);
    })
  }]);
*/

