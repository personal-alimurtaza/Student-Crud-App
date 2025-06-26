import { EnrollmentService } from "#services";
import { ResponseHandler } from "#helpers";

class EnrollmentController {
  static async enrollStudent(req, res) {
    try {
      const studentId = req.user.id;
      const { courseId } = req.body;

      const result = await EnrollmentService.enrollStudent({ studentId, courseId });
      return ResponseHandler.ok(res, result.data, result.message);
    } catch (err) {
      return EnrollmentController.handleError(res, err);
    }
  }


  static async switchEnrollment(req, res) {
    try {
      const result = await EnrollmentService.switchEnrollment(req.body);
      return ResponseHandler.ok(res, result.data, result.message);
    } catch (err) {
      return EnrollmentController.handleError(res, err);
    }
  }

  static async getAllEnrollments(req, res) {
    try {
      const result = await EnrollmentService.getAllEnrollments();
      return ResponseHandler.ok(res, result.data);
    } catch (err) {
      return EnrollmentController.handleError(res, err);
    }
  }

  static async getEnrollmentById(req, res) {
    try {
      const result = await EnrollmentService.getEnrollmentById(req.params.id);
      return ResponseHandler.ok(res, result.data);
    } catch (err) {
      return EnrollmentController.handleError(res, err);
    }
  }

  static handleError(res, err) {
    switch (err.type) {
      case "validation":
        return ResponseHandler.badRequest(res, err.errors);
      case "conflict":
        return ResponseHandler.conflict(res, null, err.message);
      case "not_found":
        return ResponseHandler.notFound(res, null, err.message);
      case "forbidden":
        return ResponseHandler.forbidden(res, null, err.message);
      case "bad_request":
        return ResponseHandler.badRequest(res, null, err.message);
      default:
        return ResponseHandler.serverError(res, null, err.message || "Something went wrong");
    }
  }
}

export default EnrollmentController;
