import { DataTypes } from "sequelize";
import sequelize from "../connections/dbconnection.js";

const Courses = sequelize.define(
  "Course",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      unique: true,
    },
    isRegistrationOpen: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
  },
  {
    tableName: "courses",
  }
);

export default Courses;
