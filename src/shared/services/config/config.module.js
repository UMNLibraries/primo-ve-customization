import Config from './config.service';

export default angular
  .module('config', [])
  .service('config', Config)
  .name;
