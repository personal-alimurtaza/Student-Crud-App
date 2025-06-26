import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ courseId, clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You are not logged in.");
      setLoading(false);
      navigate("/auth");
      return;
    }

    if (!stripe || !elements) {
      setError("Stripe has not loaded properly.");
      setLoading(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setError("Card information is incomplete.");
      setLoading(false);
      return;
    }

    try {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        try {
          await axios.post(
            "/payments/confirm",
            {
              paymentIntentId: result.paymentIntent.id,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          await axios.post(
            "/enrollments/enroll",
            {
              courseId,
              paymentIntentId: result.paymentIntent.id,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setSuccess(true);
          setTimeout(() => {
            navigate("/dashboard");
          }, 2500);
        } catch (err) {
          console.error("Enrollment or confirmation failed:", err);
          setError(err.response?.data?.message || "Enrollment error");
        }
      }
    } catch {
      setError("Payment processing error.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="p-2 border border-gray-300 rounded focus-within:ring-2 focus-within:ring-blue-500">
        <CardElement />
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}
      {success && (
        <p className="text-green-600 text-sm text-center">
          Enrollment successful! Redirecting...
        </p>
      )}

      <button
        type="submit"
        disabled={loading || !stripe}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all font-semibold"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default CheckoutForm;
