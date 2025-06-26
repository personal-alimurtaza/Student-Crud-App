import sequelize from "../connections/dbconnection.js";
import { DataTypes } from "sequelize";
import Students from "./studentModel.js";
import Courses from "./courseModel.js";

const Payments = sequelize.define("Payment", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  paymentIntentId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING, // e.g., pending, succeeded, failed
    allowNull: false,
  },
}, {
  tableName: "payments",
  timestamps: true,
});

Payments.belongsTo(Students, { foreignKey: "studentId" });
Payments.belongsTo(Courses, { foreignKey: "courseId" });

export default Payments;
