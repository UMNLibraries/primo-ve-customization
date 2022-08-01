
if (location.search.includes('vid=01UMN_INST:CENTRAL_PACKAGE')) {
  location.replace(
    location.toString().replace('vid=01UMN_INST:CENTRAL_PACKAGE', 
                                'vid=01UMN_INST:TWINCITIES'));
}

class GreeterService {
  constructor($log) {
    this.$log = $log;
  }

  init() {
    this.$log.info('HELLO from central package!');
  }
}

GreeterService.$inject = ['$log'];

angular.module('centralCustom', [])
  .service('greeterService', GreeterService)
  .run(['greeterService', greeterService => greeterService.init()]);

