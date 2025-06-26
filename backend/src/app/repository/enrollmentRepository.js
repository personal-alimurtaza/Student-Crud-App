import { Enrollments, Students, Courses } from "#models";

class EnrollmentRepository {
  static async findStudentById(id) {
    return await Students.findByPk(id);
  }

  static async findCourseById(id) {
    return await Courses.findByPk(id);
  }

  static async getStudentCourses(student) {
    return await student.getCourses();
  }

  static async addCourseToStudent(student, course) {
    return await student.addCourse(course);
  }

  static async removeCourseFromStudent(student, course) {
    return await student.removeCourse(course);
  }

  static async findAllEnrollments() {
    return await Enrollments.findAll({
      include: [
        { model: Students, attributes: ["id", "name"] },
        { model: Courses, attributes: ["id", "name"] },
      ],
    });
  }

  static async findEnrollmentById(id) {
    return await Enrollments.findByPk(id, {
      include: [
        { model: Students, attributes: ["id", "name"] },
        { model: Courses, attributes: ["id", "name"] },
      ],
    });
  }
}

export default EnrollmentRepository;
