import { CourseRepository } from "#repository";

class CourseService {
  static async getAllCourses() {
    const courses = await CourseRepository.findAllCourses();
    return { data: courses };
  }

  static async addNewCourse(payload) {
    const { name, isRegistrationOpen, price } = payload;

    const newCourse = await CourseRepository.createCourse({ name, isRegistrationOpen, price });
    return { data: newCourse, message: "Course Created !" };
  }
  static async getById(id) {
    const courseById = await CourseRepository.getById(id)
    return { data: courseById };
  }
}

export default CourseService;
