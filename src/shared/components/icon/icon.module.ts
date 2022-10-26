import PrmIconAfter from './prm-icon-after.component';
import toggle from '../../img/svg-sprite-toggle.svg';
import './icon.scss';

export default angular
  .module('icon', [])
  .component('prmIconAfter', PrmIconAfter)
  .config(['$mdIconProvider', ($mdIconProvider: ng.material.IIconProvider) => {
    $mdIconProvider.iconSet('toggle', toggle, 24);
  }])
  .name;
