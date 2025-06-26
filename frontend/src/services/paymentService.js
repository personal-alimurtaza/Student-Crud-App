import axios from "../api/axios";

export const fetchCourseById = async (courseId) => {
  const res = await axios.get(`/courses/${courseId}`);
  return res.data?.data?.data;
};

export const initiatePaymentIntent = async (courseId, amount) => {
  const res = await axios.post(
    "/payments/initiate",
    { courseId, amount },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  console.log(res)
  return res.data?.data?.clientSecret;
};
