import app from "#server"
import { studentRoutes, enrollmentRoutes, courseRoutes, paymentRoutes } from "#routes";

app.get("/", (req, res) => {
  res.send("Student CRUD APP API is running");
});

app.use("/students", studentRoutes);
app.use("/courses", courseRoutes);
app.use("/enrollments", enrollmentRoutes);
app.use("/payments/", paymentRoutes);