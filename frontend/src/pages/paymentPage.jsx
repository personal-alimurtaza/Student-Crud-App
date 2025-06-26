import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/checkoutForm.jsx";
import { stripePromise } from "../lib/stripe.js";
import { fetchCourseById, initiatePaymentIntent } from "../services/paymentService.js";

const PaymentPage = () => {
  const { courseId } = useParams();
  const [clientSecret, setClientSecret] = useState("");
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseData = await fetchCourseById(courseId);
        setCourse(courseData);

        if (!courseData?.price) throw new Error("Course price missing");

        const secret = await initiatePaymentIntent(courseId, courseData.price);
        if (secret) {
          setClientSecret(secret);
        } else {
          console.error("Client secret not received");
        }
      } catch (err) {
        console.error("Payment intent error:", err);
      }
    };

    fetchData();
  }, [courseId]);

  const appearance = { theme: "stripe" };
  const options = { clientSecret, appearance };

  return (
   <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 to-purple-200 px-4">
  <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
    <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Complete Your Payment</h2>

    {course && (
      <div className="text-center mb-6">
        <p className="text-lg text-gray-700">
          Course: <span className="font-semibold text-gray-900">{course.name}</span>
        </p>
        <p className="text-lg text-gray-700">
          Amount: <span className="font-semibold text-gray-900">${course.price}</span>
        </p>
      </div>
    )}

    {clientSecret && (
      <Elements options={options} stripe={stripePromise}>
        <CheckoutForm courseId={courseId} clientSecret={clientSecret} />
      </Elements>
    )}
  </div>
</div>

  );
};

export default PaymentPage;
