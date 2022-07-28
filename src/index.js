class GreeterService {
  constructor($log) {
    this.$log = $log;
  }

  init() {
    this.$log.info('HELLO!');
  }
}

GreeterService.$inject = ['$log'];

angular.module('viewCustom', [])
  .service('greeterService', GreeterService)
  .run(['greeterService', greeterService => greeterService.init()]);

