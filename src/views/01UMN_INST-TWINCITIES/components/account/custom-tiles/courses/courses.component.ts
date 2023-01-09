import template from "./courses.html";
import { Course } from "./courses.model";
import { CoursesService } from "./courses.service";

class CoursesController implements ng.IController {
  private courses: Course[] = [];
  private loading: boolean;

  static $inject = ["courses"];
  constructor(private coursesService: CoursesService) {}

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

export const CoursesComponent: ng.IComponentOptions = {
  controller: CoursesController,
  template: template,
};
