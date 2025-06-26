import { StudentRepository } from "#repository";
import { v4 as uuidv4 } from "uuid";
import { EmailService } from "#services";
import { HashHelper, generateToken } from "#helpers";

class StudentsService {
  static async createStudent({ name, email, password }) {
    const hashedPassword = await HashHelper.hashPassword(password);
    const verifyToken = uuidv4();

    const newStudent = await StudentRepository.create({
      name,
      email,
      password: hashedPassword,
      verifyToken,
      isVerified: false,
    });

    await EmailService.sendVerificationEmail(email, verifyToken);

    return {
      id: newStudent.id,
      name,
      email,
    };
  }

  static async login({ email, password }) {
    const student = await StudentRepository.findByEmail(email);

    if (!student || !student.isVerified) {
      throw { type: "unauthorized", message: "Invalid credentials or email not verified" };
    }

    const isMatch = await HashHelper.comparePassword(password, student.password);
    if (!isMatch) {
      throw { type: "unauthorized", message: "Invalid email or password" };
    }

    const token = generateToken({ id: student.id, email: student.email });

    return {
      token,
      student: {
        id: student.id,
        name: student.name,
        email: student.email,
      },
    };
  }

  static async getAllStudents() {
    return await StudentRepository.findAll();
  }

  static async getStudentById(studentId) {
    const student = await StudentRepository.findByIdWithCourses(studentId);
    if (!student) {
      throw { type: "not_found", message: "Student not found" };
    }
    return student;
  }
}

export default StudentsService;
