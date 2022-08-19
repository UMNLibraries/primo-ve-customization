// NOTE for future: lodash (_) may be available globally 
//
import './css/foo.css';
import './css/bar.css';

const CENTRAL_PACKAGE_BASE_URL = '/discovery/custom/01UMN_INST-CENTRAL_PACKAGE';

// (might need to polyfill Promise or just use a onload callback instead) 

function loadCentralJs() {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `${CENTRAL_PACKAGE_BASE_URL}/js/custom.js`;
    script.onload = resolve;
    script.onerror = reject;
    script.async = true;
    document.body.appendChild(script);
  });
}

/**
 * append the central CSS file before the view-level CSS so that view-level
 * can override the central package
 */
function loadCentralCss() {
  return new Promise((resolve, reject) => {
    const viewStyle = document.querySelector('link[href$="custom1.css"]');
    const centralStyle = document.createElement('link');
    centralStyle.href = `${CENTRAL_PACKAGE_BASE_URL}/css/custom1.css`
    centralStyle.rel = 'stylesheet';
    centralStyle.type = 'text/css';
    centralStyle.onload = resolve;
    centralStyle.onerror = reject;
    document.head.insertBefore(centralStyle, viewStyle);
  });
}

Promise.all([loadCentralJs(), loadCentralCss()]).then(() =>
  angular.module('viewCustom', ['centralCustom']));
