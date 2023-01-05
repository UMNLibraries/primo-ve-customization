declare global {
  const angular: ng.IAngularStatic;
  const _: _.LoDashStatic;
}

/**
 * creating a custom type definition for angular-load because the
 * @type/angular-load package breaks the global angular constant
 * above in its namespace declaration.
 */
declare module "angular" {
  namespace load {
    interface IAngularLoadService {
      loadScript(url: string): ng.IPromise<any>;
      loadCSS(url: string): ng.IPromise<any>;
    }
  }
}

export {};
