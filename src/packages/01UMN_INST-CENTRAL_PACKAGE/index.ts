
if (location.search.includes('vid=01UMN_INST:CENTRAL_PACKAGE')) {
  location.href = location.toString().replace('vid=01UMN_INST:CENTRAL_PACKAGE', 
                                              'vid=01UMN_INST:TWINCITIES');
}

import globals from './globals';

console.log(globals);

import './color-theme/colors.css';
import Components from './components/components.module';

class GreeterService {
  public static $inject = ['$log'];

  constructor(private $log: ng.ILogService) {
    this.$log = $log;
  }

  init() {
    this.$log.info('HELLO from central package!');
  }
}

angular.module('centralCustom', [Components])
  .service('greeterService', GreeterService)
  .run(['greeterService', (greeterService: GreeterService) => greeterService.init()]);

