import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentService from "../services/studentService.js";

const AuthorizationForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const toggleForm = () => {
    setForm({ name: "", email: "", password: "" });
    setMessage("");
    setIsLogin(!isLogin);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const { token } = await StudentService.login({
          email: form.email,
          password: form.password,
        });

        if (token) {
          navigate("/dashboard");
        }
      } else {
        const msg = await StudentService.register(form);
        setMessage(msg || "Registered! Check your email to verify.");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-purple-200">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md mx-4 sm:mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        {isLogin ? "Login" : "Registeration"}
        </h2>

        {message && (
          <p className="text-red-500 text-sm text-center mb-4 font-medium">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all font-semibold"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <div className="text-center text-sm mt-6 text-gray-600">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <button
                onClick={toggleForm}
                className="text-blue-600 hover:underline font-medium"
              >
                Register now
              </button>
            </>
          ) : (
            <>
              Already registered?{" "}
              <button
                onClick={toggleForm}
                className="text-blue-600 hover:underline font-medium"
              >
                Login instead
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorizationForm;
