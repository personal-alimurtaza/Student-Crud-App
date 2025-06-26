import { StudentsService } from "#services";
import { StudentRepository } from "#repository";
import { ResponseHandler } from "#helpers";

class StudentController {
  static async createStudent(req, res) {
    try {
      const student = await StudentsService.createStudent(req.body);
      return ResponseHandler.created(res, student, "Account created. Check your email.");
    } catch (error) {
      return ResponseHandler.serverError(res, null, error.message);
    }
  }

  static async login(req, res) {
    try {
      const student = await StudentsService.login(req.body);
      return ResponseHandler.ok(res, student, "Login successful");
    } catch (error) {
      const { type, message } = error;
      if (type === "unauthorized") {
        return ResponseHandler.unauthorized(res, null, message);
      }
      return ResponseHandler.serverError(res, null, message);
    }
  }

  static async getAllStudents(req, res) {
    try {
      const students = await StudentsService.getAllStudents();
      return ResponseHandler.ok(res, students);
    } catch (error) {
      return ResponseHandler.serverError(res, null, error.message);
    }
  }

  static async getStudentById(req, res) {
    try {
      const student = await StudentsService.getStudentById(req.params.id);
      return ResponseHandler.ok(res, student);
    } catch (error) {
      return ResponseHandler.serverError(res, null, error.message);
    }
  }

  static async verifyStudent(req, res) {
    try {
      const { token } = req.params;
      const student = await StudentRepository.findByToken(token);

      if (!student) {
        return ResponseHandler.notFound(res, null, "Invalid or expired token");
      }

      student.isVerified = true;
      student.verifyToken = null;
      await student.save();

      return ResponseHandler.ok(res, { id: student.id }, "Email verified successfully");
    } catch (error) {
      return ResponseHandler.serverError(res, null, error.message);
    }
  }
}

export default StudentController;
