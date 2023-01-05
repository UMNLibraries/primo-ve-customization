import { Course, CoursesResponse } from "./courses.model";

export class CoursesService {
  static URL = "https://stacks.lib.umn.edu/userapi/current-user/courses";

  static $inject = ["$http", "$q", "$log"];
  constructor(
    private $http: ng.IHttpService,
    private $q: ng.IQService,
    private $log: ng.ILogService
  ) {}

  public getCourses(): ng.IPromise<Course[]> {
    let deferred: ng.IDeferred<Course[]> = this.$q.defer();
    this.$http
      .get<CoursesResponse>(CoursesService.URL, {
        withCredentials: true,
        cache: true,
      })
      .then((resp) => deferred.resolve(this.mergeCourses(resp.data.courses)))
      .catch((error) => this.$log.error(error));
    return deferred.promise;
  }

  private mergeCourses(courses: CoursesResponse["courses"]): Course[] {
    return courses.student.concat(courses.instructor);
  }
}
