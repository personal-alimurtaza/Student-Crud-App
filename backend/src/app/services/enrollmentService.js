import { EnrollmentRepository } from "#repository";
import { EmailService } from "#services";

class EnrollmentService {
  static async enrollStudent(data) {
    const { studentId, courseId, paymentIntentId } = data;

    const student = await EnrollmentRepository.findStudentById(studentId);
    const course = await EnrollmentRepository.findCourseById(courseId);

    if (!student || !course) {
      throw { type: "not_found", message: "Student or Course not found" };
    }

    if (!course.isRegistrationOpen) {
      throw { type: "forbidden", message: "Registration is closed for this course" };
    }

    const enrolledCourses = await EnrollmentRepository.getStudentCourses(student);
    if (enrolledCourses.find((c) => c.id === courseId)) {
      throw { type: "conflict", message: "Already enrolled in this course" };
    }

    if (enrolledCourses.length >= 5) {
      throw { type: "forbidden", message: "Cannot enroll in more than 5 courses" };
    }

    await EnrollmentRepository.addCourseToStudent(student, course);

    // const payment = await PaymentRepository.findByIntentId(paymentIntentId);
    // if (!payment) {
    //   console.warn("Payment record not found for:", paymentIntentId);
    // }

    try {
      await EmailService.sendEnrollmentEmail(
        student.email,
        student.name,
        course.name
      );
    } catch (err) {
      console.warn("Failed to send enrollment email:", err.message);
    }


    return {
      data: { studentId, courseId },
      message: "Enrolled successfully",
    };
  }

  static async switchEnrollment(data) {
    const { studentId, oldCourseId, newCourseId } = data;

    const student = await EnrollmentRepository.findStudentById(studentId);
    const oldCourse = await EnrollmentRepository.findCourseById(oldCourseId);
    const newCourse = await EnrollmentRepository.findCourseById(newCourseId);

    if (!student || !oldCourse || !newCourse) {
      throw { type: "not_found", message: "Invalid student or course ID(s)" };
    }

    if (!newCourse.isRegistrationOpen) {
      throw { type: "forbidden", message: "Registration closed for new course" };
    }

    const enrolledCourses = await EnrollmentRepository.getStudentCourses(student);
    const isEnrolledInOld = enrolledCourses.find((c) => c.id === oldCourseId);
    const isEnrolledInNew = enrolledCourses.find((c) => c.id === newCourseId);

    if (!isEnrolledInOld) {
      throw { type: "bad_request", message: "Not enrolled in the old course" };
    }

    if (isEnrolledInNew) {
      throw { type: "conflict", message: "Already enrolled in the new course" };
    }

    await EnrollmentRepository.removeCourseFromStudent(student, oldCourse);
    await EnrollmentRepository.addCourseToStudent(student, newCourse);

    return {
      data: { studentId, newCourseId },
      message: "Enrollment switched",
    };
  }

  static async getAllEnrollments() {
    const enrollments = await EnrollmentRepository.findAllEnrollments();
    return { data: enrollments };
  }

  static async getEnrollmentById(enrollmentId) {
    const enrollment = await EnrollmentRepository.findEnrollmentById(enrollmentId);
    if (!enrollment) {
      throw { type: "not_found", message: "Enrollment not found" };
    }
    return { data: enrollment };
  }
}

export default EnrollmentService;
