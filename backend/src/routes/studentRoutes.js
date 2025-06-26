import { Router } from "express";
import { StudentController } from "#controllers";
import { SchemaValidation } from "#helpers";
import { validate } from "../middlewares/schemaValidation.js";
import { authenticate } from "#middlewares";

const studentRouter = Router();

studentRouter
  .post("/", validate(SchemaValidation.studentSchema), StudentController.createStudent)
  .post("/login", StudentController.login)
  .get("/verify-email/:token", StudentController.verifyStudent)
  .get("/", StudentController.getAllStudents)
  .get("/:id", StudentController.getStudentById);

export default studentRouter;
