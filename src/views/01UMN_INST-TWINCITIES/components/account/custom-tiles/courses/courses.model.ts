export interface Course {
  role: string;
  term: string;
  enrollCampus: string;
  courseCampus: string;
  courseId: string;
  subject: string;
  courseNumber: string;
  section: string;
  sectionType: string;
}

export interface CoursesResponse {
  responseCode: number;
  courses: {
    student: Course[];
    instructor: Course[];
  };
}
