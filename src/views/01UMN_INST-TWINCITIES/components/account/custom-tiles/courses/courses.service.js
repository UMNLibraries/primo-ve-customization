export class CoursesService {
  static URL = "https://stacks.lib.umn.edu/userapi/current-user/courses";
  static $inject = ["$http", "$q", "$log"];
  constructor($http, $q, $log) {
    this.$http = $http;
    this.$q = $q;
    this.$log = $log;
  }

  getCourses() {
    let deferred = this.$q.defer();
    this.$http
      .get(CoursesService.URL, { withCredentials: true, cache: true })
      .then((resp) => deferred.resolve(this.mergeCourses(resp.data.courses)))
      .catch((error) => this.$log.error(error));
    return deferred.promise;
  }

  mergeCourses(courses) {
    return courses.student.concat(courses.instructor);
  }
}
