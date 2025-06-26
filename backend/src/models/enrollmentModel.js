import sequelize from "../connections/dbconnection.js";
import { DataTypes } from "sequelize";
import Students from "./studentModel.js";
import Courses from "./courseModel.js";

const Enrollments = sequelize.define(
  "Enrollment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    timestamps: false,
    tableName: "enrollments",
  }
);

Students.belongsToMany(Courses, {
  through: Enrollments,
  foreignKey: "studentId",
  otherKey: "courseId",
});

Courses.belongsToMany(Students, {
  through: Enrollments,
  foreignKey: "courseId",
  otherKey: "studentId",
});

Enrollments.belongsTo(Students, { foreignKey: "studentId" });
Enrollments.belongsTo(Courses, { foreignKey: "courseId" });

export default Enrollments