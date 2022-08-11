// NOTE for future: lodash (_) may be available globally 
//
//import './css/foo.css';
import './css/bar.css';

const CENTRAL_PACKAGE_BASE_URL = '/discovery/custom/01UMN_INST-CENTRAL_PACKAGE';

// (might need to polyfill Promise or just use a onload callback instead) 

const loadCentralJs = new Promise((resolve, reject) => {
  const script = document.createElement('script');
  script.src = `${CENTRAL_PACKAGE_BASE_URL}/js/custom.js`;
  script.onload = resolve;
  script.onerror = reject;
  script.async = true;
  document.head.appendChild(script);
});

const loadCentralCss = new Promise((resolve, reject) => {
  const style = document.createElement('link');
  style.href = `${CENTRAL_PACKAGE_BASE_URL}/css/custom1.css`
  style.rel = 'stylesheet';
  style.type = 'text/css';
  style.onload = resolve;
  style.onerror = reject;
  document.head.appendChild(style);
});

Promise.all([loadCentralJs, loadCentralCss]).then(() => 
  angular.module('viewCustom', ['centralCustom']));

