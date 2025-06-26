import { Router } from "express";
import { CourseController } from "#controllers";
import { SchemaValidation } from "#helpers";
import { validate } from "../middlewares/schemaValidation.js";
import { authenticate } from "#middlewares";

const courseRouter = Router();

courseRouter.get("/", authenticate, CourseController.getAllCourses);
courseRouter.post(
  "/p",
  validate(SchemaValidation.courseSchema),
  CourseController.addNewCourse
);
courseRouter.get("/:id", authenticate, CourseController.getCourseById);
export default courseRouter;
