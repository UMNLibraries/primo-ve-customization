
if (location.search.includes('vid=01UMN_INST:CENTRAL_PACKAGE')) {
  location.href = location.toString().replace('vid=01UMN_INST:CENTRAL_PACKAGE', 
                                              'vid=01UMN_INST:TWINCITIES');
}

import './foo.css';

class GreeterService {
  constructor(private $log: ng.ILogService) {
    this.$log = $log;
  }

  init() {
    this.$log.info('HELLO from central package!');
  }
}

GreeterService.$inject = ['$log'];

angular.module('centralCustom', [])
  .service('greeterService', GreeterService)
  .run(['greeterService', (greeterService: GreeterService) => greeterService.init()]);

