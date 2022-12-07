const RESPONSE_FIXTURE = `
{
  "responseCode": 200,
  "courses": {
    "student": [
      {
        "role": "Student",
        "term": "1183",
        "enrollCampus": "UMNTC",
        "courseCampus": "UMNTC",
        "courseId": "014658",
        "subject": "COMM",
        "courseNumber": "3625",
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
        "courseId": "025271",
        "subject": "COMM",
        "courseNumber": "4471",
        "section": "001",
        "sectionType": "LEC"
      },
      {
        "role": "Student",
        "term": "1183",
        "enrollCampus": "UMNTC",
        "courseCampus": "UMNTC",
        "courseId": "021494",
        "subject": "NURS",
        "courseNumber": "6213",
        "section": "001",
        "sectionType": "LEC"
      },
      {
        "role": "Student",
        "term": "1183",
        "enrollCampus": "UMNTC",
        "courseCampus": "UMNTC",
        "courseId": "023310",
        "subject": "NURS",
        "courseNumber": "6214",
        "section": "002",
        "sectionType": "FWK"
      },
      {
        "role": "Student",
        "term": "1183",
        "enrollCampus": "UMNTC",
        "courseCampus": "UMNTC",
        "courseId": "021491",
        "subject": "NURS",
        "courseNumber": "7102",
        "section": "001",
        "sectionType": "LEC"
      },
      {
        "role": "Student",
        "term": "1183",
        "enrollCampus": "UMNTC",
        "courseCampus": "UMNTC",
        "courseId": "023591",
        "subject": "NURS",
        "courseNumber": "7112",
        "section": "012",
        "sectionType": "FWK"
      },
      {
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
        "courseId": "014684",
        "subject": "PUBH",
        "courseNumber": "3102",
        "section": "320",
        "sectionType": "IND"
      }
    ],
    "instructor": [
      {
        "role": "Instructor",
        "term": "1183",
        "enrollCampus": "UMNTC",
        "courseCampus": "UMNTC",
        "courseId": "013274",
        "subject": "COMM",
        "courseNumber": "3601",
        "section": "001",
        "sectionType": "LEC"
      },
      {
        "role": "Instructor",
        "term": "1183",
        "enrollCampus": "UMNTC",
        "courseCampus": "UMNTC",
        "courseId": "035436",
        "subject": "COMM",
        "courseNumber": "3995W",
        "section": "003",
        "sectionType": "IND"
      },
      {
        "role": "Instructor",
        "term": "1183",
        "enrollCampus": "UMNTC",
        "courseCampus": "UMNTC",
        "courseId": "024404",
        "subject": "CSPH",
        "courseNumber": "3001",
        "section": "001",
        "sectionType": "LEC"
      }
    ]
  }
}`;

describe("Courses Service", () => {
  let courses, $httpBackend;

  beforeEach(() => {
    angular.mock.module("courses");
    angular.mock.inject(($injector) => {
      courses = $injector.get("courses");
      $httpBackend = $injector.get("$httpBackend");
    });
  });

  it("should return a merged array of student and instructor courses", () => {
    $httpBackend.expectGET(courses.coursesUrl).respond(RESPONSE_FIXTURE);
    courses.getCourses().then((courseList) => {
      expect(courseList.length).toBe(12);
      expect(courseList.filter((c) => c.role === "Student").length).toBe(9);
      expect(courseList.filter((c) => c.role === "Instructor").length).toBe(3);
    });
    $httpBackend.flush();
  });

  it("should return an empty array if the user has no courses", () => {
    let response = `
    {
      responseCode: 200,
      courses: {
      student: [ ],
      instructor: [ ]
      }
    }`;
    $httpBackend.expectGET(courses.coursesUrl).respond(response);
    courses.getCourses().then((courseList) => {
      expect(courseList.length).toBe(0);
    });
    $httpBackend.flush();
  });
});
