import { Router } from "express";
import { EnrollmentController } from "#controllers";
import { authenticate } from "#middlewares";
const enrollmentRouter = Router();

enrollmentRouter.use(authenticate);

enrollmentRouter
  .post("/enroll", authenticate, EnrollmentController.enrollStudent)
  .post("/switch", EnrollmentController.switchEnrollment)
  .get("/:id", EnrollmentController.getEnrollmentById)
  .get("/", EnrollmentController.getAllEnrollments);

export default enrollmentRouter;
