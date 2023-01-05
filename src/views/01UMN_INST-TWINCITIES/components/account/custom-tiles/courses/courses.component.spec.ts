const courses: Course[] = JSON.parse(`
[{
  "role": "Student",
  "term": "1183",
  "enrollCampus": "UMNTC",
  "courseCampus": "UMNTC",
  "courseId": "020001",
  "subject": "NURS",
  "courseNumber": "7610",
  "section": "001",
  "sectionType": "LEC"
},
{
  "role": "Student",
  "term": "1183",
  "enrollCampus": "UMNTC",
  "courseCampus": "UMNTC",
  "courseId": "020002",
  "subject": "NURS",
  "courseNumber": "7610",
  "section": "001",
  "sectionType": "LEC"
},
{
  "role": "Student",
  "term": "1183",
  "enrollCampus": "UMNTC",
  "courseCampus": "UMNTC",
  "courseId": "025072",
  "subject": "COMM",
  "courseNumber": "3645W",
  "section": "001",
  "sectionType": "LEC"
},
{
  "role": "Student",
  "term": "1183",
  "enrollCampus": "UMNTC",
  "courseCampus": "UMNTC",
  "courseId": "014684",
  "subject": "PUBH",
  "courseNumber": "3102",
  "section": "320",
  "sectionType": "IND"
}]`);

import { CoursesModule } from ".";
import { FiltersModule } from "../../../../../../shared/filters";
import { Course } from "./courses.model";
import { CoursesService } from "./courses.service";

describe("Courses Component", () => {
  let element: ng.IAugmentedJQuery,
    scope: ng.IRootScopeService & { [key: string]: any },
    controller: ng.IComponentController,
    $compile: ng.ICompileService,
    coursesService: CoursesService,
    $q: ng.IQService;

  beforeEach(() => {
    angular.mock.module(CoursesModule, FiltersModule);
  });

  beforeEach(() => {
    angular.mock.inject(($injector) => {
      scope = $injector.get("$rootScope").$new();
      $compile = $injector.get("$compile");
      coursesService = $injector.get("courses");
      $q = $injector.get("$q");
    });
    scope.callback = jasmine.createSpy("callback");
    let html = "<courses></courses>";
    element = $compile(html)(scope);
    controller = element.controller("courses");
    scope.$apply();
  });

  function mockCourses() {
    spyOn(coursesService, "getCourses").and.returnValue($q.resolve(courses));
  }

  function mockZeroCourses() {
    spyOn(coursesService, "getCourses").and.returnValue($q.resolve([]));
  }

  function loadCourses() {
    scope.$apply(() => controller.loadCourses());
  }

  it("should list sorted, de-duplicated courses when available", () => {
    mockCourses();
    loadCourses();
    const listItems = element.find("md-list-item");
    expect(listItems.length).toEqual(3);
    expect(listItems[0].innerHTML).toContain("COMM 3645W");
    expect(listItems[1].innerHTML).toContain("NURS 7610");
    expect(listItems[2].innerHTML).toContain("PUBH 3102");
    expect(listItems[0].children[0].getAttribute("href")).toBe(
      "https://www.lib.umn.edu/course/COMM/3645W"
    );
    expect(listItems[1].children[0].getAttribute("href")).toBe(
      "https://www.lib.umn.edu/course/NURS/7610"
    );
    expect(listItems[2].children[0].getAttribute("href")).toBe(
      "https://www.lib.umn.edu/course/PUBH/3102"
    );
  });

  it("should display an icon when no courses are available", () => {
    mockZeroCourses();
    loadCourses();
    expect(element.find("md-list-item").length).toBe(0);
    expect(element.find("prm-icon")[0]).toBeTruthy();
    expect(element.html()).toContain("no guides");
  });
});
