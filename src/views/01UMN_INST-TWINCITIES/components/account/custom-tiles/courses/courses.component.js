import template from "./courses.html";

class CoursesController {
  static $inject = ["courses"];
  constructor(coursesService) {
    this.coursesService = coursesService;
    this.courses = [];
  }

  loadCourses() {
    this.loading = true;
    this.coursesService
      .getCourses()
      .then((courses) => (this.courses = courses))
      .finally(() => (this.loading = false));
  }

  hasCourses() {
    return Array.isArray(this.courses) && this.courses.length > 0;
  }
}

export const CoursesComponent = {
  controller: CoursesController,
  template: template,
};
