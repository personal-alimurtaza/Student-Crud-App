import { CourseService } from "#services";
import { ResponseHandler } from "#helpers";

class CourseController {
  static async getAllCourses(req, res) {
    try {
      const result = await CourseService.getAllCourses();
      return ResponseHandler.ok(res, result.data);
    } catch (err) {
      return CourseController.handleError(res, err);
    }
  }

  static async addNewCourse(req, res) {
    try {
      const result = await CourseService.addNewCourse(req.body);
      return ResponseHandler.created(res, result.data, result.message);
    } catch (err) {
      return CourseController.handleError(res, err);
    }
  }

  static async getCourseById(req, res) {
    try {
      const course = await CourseService.getById(req.params.id);

      if (!course) {
        return ResponseHandler.notFound(res, null, "Course not found");
      }

      return ResponseHandler.ok(res, course, "Course retrieved successfully");
    } catch (err) {
      return CourseController.handleError(res, err);
    }
  }

  static handleError(res, err) {
    switch (err.type) {
      case "validation":
        return ResponseHandler.badRequest(res, err.errors);
      case "not_found":
        return ResponseHandler.notFound(res, null, err.message);
      case "conflict":
        return ResponseHandler.conflict(res, null, err.message);
      default:
        return ResponseHandler.serverError(res, null, err.message || "Something went wrong");
    }
  }
}

export default CourseController;
