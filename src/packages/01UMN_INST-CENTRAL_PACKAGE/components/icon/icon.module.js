import PrmIconAfter from './prm-icon-after.component.js';
import toggle from './svg-sprite-toggle.svg';
import './icon.scss';

export default angular
  .module('icon', [])
  .component('prmIconAfter', PrmIconAfter)
  .config(['$mdIconProvider', ($mdIconProvider) => {
    $mdIconProvider.iconSet('toggle', toggle, 24);
  }])
  .name;
