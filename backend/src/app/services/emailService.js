import { transporter } from "#connections";

class EmailService {
  static async sendVerificationEmail(email, token) {
    const verifyUrl = `http://localhost:5000/students/verify-email/${token}`;

    const html = `
      <h2>Verify Your Account</h2>
      <p>Please click the button below to verify your email address:</p>
      <a href="${verifyUrl}" style="padding: 10px 20px; background-color: #457777; color: white; text-decoration: none;">Verify Email</a>
      <p>If you already verified, you can ignore this message.</p>
    `;

    return transporter.sendMail({
      from: '"No Reply" <sobiiii3265@gmail.com>',
      to: email,
      subject: "Email Verification",
      html,
    });
  }

  static async sendEnrollmentEmail(email, studentName, courseName) {
    const html = `
    <h2>Enrollment Confirmation</h2>
    <p>Hello <strong>${studentName}</strong>,</p>
    <p>You have successfully enrolled in <strong>${courseName}</strong>.</p>
    <p>We’re excited to have you in our Acdemia.</p>
    <br/>
    <p>— The Course Team</p>
  `;

    return transporter.sendMail({
      from: '"No Reply" <sobiiii3265@gmail.com>',
      to: email,
      subject: `Enrollment Confirmation: ${courseName}`,
      html,
    });
  }
}



export default EmailService