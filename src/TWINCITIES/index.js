// NOTE for future: lodash (_) may be available globally 
//
import '../css/foo.css';
import '../css/bar.css';

//TODO: maybe use SystemJS for this?
// (might need to polyfill Promise or just use a onload callback instead) 
const loadCentralPackage = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    const centralPackageUrl = 
      '/discovery/custom/01UMN_INST-CENTRAL_PACKAGE/js/custom.js';
    script.onload = resolve;
    script.onerror = reject;
    script.async = true;
    script.src = centralPackageUrl;
    document.head.appendChild(script);
  });
};

loadCentralPackage().then(() => 
  angular.module('viewCustom', ['centralCustom']));

