const CENTRAL_PACKAGE_BASE_URL = 'custom/01UMN_INST-CENTRAL_PACKAGE';

function loadCentralJs(): Promise<Event> {
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
function loadCentralCss(): Promise<Event> {
  return new Promise((resolve, reject) => {
    const viewStyle = document.querySelector('link[href$="custom1.css"]');
    const centralStyle = document.createElement('link');
    centralStyle.rel = 'stylesheet';
    centralStyle.type = 'text/css';
    centralStyle.href = `${CENTRAL_PACKAGE_BASE_URL}/css/custom1.css`
    centralStyle.onload = resolve;
    centralStyle.onerror = reject;
    document.head.insertBefore(centralStyle, viewStyle);
  });
}

export function loadCentralPackage() {
  return Promise.all([loadCentralJs(), loadCentralCss()]);
} 

