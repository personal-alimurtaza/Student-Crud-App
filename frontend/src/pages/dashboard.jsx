import { useEffect, useState } from "react";
import CourseService from "../services/courseService";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await CourseService.getAllCourses();
        setCourses(data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      }
    };
    fetchCourses();
  }, []);

  const handleEnroll = (courseId) => {
    navigate(`/payment/${courseId}`);
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-100 to-purple-200 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-10 text-gray-800 text-center">Available Courses</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-xl shadow-md p-6 transition hover:shadow-xl"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{course.name}</h2>

            <p className="text-sm text-gray-600 mb-1">
              Registration:{" "}
              <span
                className={
                  course.isRegistrationOpen ? "text-green-600 font-semibold" : "text-red-600 font-semibold"
                }
              >
                {course.isRegistrationOpen ? "Open" : "Closed"}
              </span>
            </p>

            <p className="text-gray-700 font-medium mb-4">Price: ${course.price}</p>

            {course.isRegistrationOpen ? (
              <button
                onClick={() => handleEnroll(course.id)}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition-all font-bold"
              >
                Enroll Now
              </button>
            ) : (
              <button
                disabled
                className="bg-gray-400 text-white px-5 py-2 rounded-lg cursor-not-allowed"
              >
                Enrollment Closed
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
