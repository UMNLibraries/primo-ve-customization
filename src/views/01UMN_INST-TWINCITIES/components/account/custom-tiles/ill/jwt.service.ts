// Normally, $$childHead should be treated as private, but this is the most
// convenient way to access the root element's controller...
interface PrimoExploreRootScope extends ng.IRootElementService {
  $$childHead: {
    $ctrl: ng.IController & {
      userSessionManagerService: {
        getJwt(): string;
      };
    };
  };
}

class JwtService {
  static $inject = ["$rootScope"];
  constructor(private $rootScope: PrimoExploreRootScope) {}

  getJwt(): string {
    if (this.userSessionManagerService) {
      return JSON.parse(this.userSessionManagerService.getJwt());
    } else {
      return "";
    }
  }

  private get userSessionManagerService() {
    return this.$rootScope?.$$childHead?.$ctrl?.userSessionManagerService;
  }
}

export { JwtService };
