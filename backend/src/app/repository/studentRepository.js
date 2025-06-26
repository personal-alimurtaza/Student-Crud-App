import { Students, Courses } from "#models";
import { Op } from "sequelize";

class StudentRepository {
  static async create({ name, email, password, verifyToken, isVerified }) {
    return await Students.create({ name, email, password, verifyToken, isVerified });
  }

  static async findByEmail(email) {
    return await Students.findOne({ where: { email } });
  }

  static async findUnverified() {
    return await Students.findAll({
      where: {
        isVerified: false,
        verifyToken: { [Op.ne]: null },
      },
    });
  }

  static async findAll() {
    return await Students.findAll({
      attributes: { exclude: ["password", "verificationToken"] },
    });
  }

  static async findByIdWithCourses(id) {
    return await Students.findByPk(id, {
      attributes: { exclude: ["password", "verificationToken"] },
      include: {
        model: Courses,
        through: { attributes: [] },
      },
    });
  }

  static async findByToken(token) {
    return await Students.findOne({ where: { verifyToken: token } });
  }

}

export default StudentRepository;
