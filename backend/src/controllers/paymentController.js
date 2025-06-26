import { PaymentService } from "#services";
import { ResponseHandler } from "#helpers";

class PaymentController {
  static async initiatePayment(req, res) {
    try {
      const { courseId, amount } = req.body;
      const studentId = req.user?.id || req.body.studentId;

      if (!studentId) {
        return ResponseHandler.badRequest(res, null, "Missing  id");
      }

      const clientSecret = await PaymentService.createPaymentIntent({
        studentId,
        courseId,
        amount,
      });

      return ResponseHandler.ok(res, { clientSecret }, "Payment started");
    } catch (err) {
      return ResponseHandler.serverError(res, null, err.message);
    }
  }

  static async confirmPayment(req, res) {
    try {
      const { paymentIntentId } = req.body;
      const isSuccess = await PaymentService.confirmPayment(paymentIntentId);

      if (isSuccess) {
        return ResponseHandler.ok(res, null, "Payment sent");
      } else {
        return ResponseHandler.badRequest(res, null, "Payment not confirmed");
      }
    } catch (err) {
      return ResponseHandler.serverError(res, null, err.message);
    }
  }
}

export default PaymentController;
