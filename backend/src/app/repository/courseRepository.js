import { Courses } from "#models";

class CourseRepository {
  static async findAllCourses() {
    return await Courses.findAll();
  }

  static async createCourse(courseData) {
    return await Courses.create(courseData);
  }

  static async getById(id) {
    return await Courses.findByPk(id);
  }
}

export default CourseRepository;
