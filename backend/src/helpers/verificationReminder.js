import cron from "node-cron";
import { StudentRepository } from "#repository";
import { EmailService } from "#services";

cron.schedule("59 23 * * *", async () => {
  console.log("Running daily verification reminder email job");

  try {
    const unverifiedStudents = await StudentRepository.findUnverified();

    for (const student of unverifiedStudents) {
      console.log(`Sending reminder to ${student.email}`);
      await EmailService.sendVerificationEmail(student.email, student.verifyToken);
    }

    console.log(`${unverifiedStudents.length} reminder emails sent`);
  } catch (err) {
    console.error("Cron job error:", err.message);
  }
});
