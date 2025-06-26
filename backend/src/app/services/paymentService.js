import PaymentRepository from "../repository/paymentRepository.js";
import stripe from "stripe";

const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

class PaymentService {
  static async createPaymentIntent({ studentId, courseId, amount }) {
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount,
      currency: "usd",
      metadata: { studentId, courseId },
    });

    await PaymentRepository.create({
      studentId,
      courseId,
      amount,
      status: "pending",
      paymentIntentId: paymentIntent.id,
    });

    return paymentIntent.client_secret;
    
  }

  static async confirmPayment(paymentIntentId) {
    const intent = await stripeInstance.paymentIntents.retrieve(
      paymentIntentId
    );
    if (intent.status === "succeeded") {
      await PaymentRepository.updateStatus(paymentIntentId, "succeeded");
      return true;
    }
    return false;
  }
}

export default PaymentService;
