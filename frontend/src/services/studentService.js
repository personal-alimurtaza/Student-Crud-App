
import API from "../api/axios";

const StudentService = {
  async login(data) {
    const res = await API.post("/students/login", data);
    const token = res.data.data.token;
    const student = res.data.data.student;

    localStorage.setItem("token", token);
    return { student, token };
  },

  async register(data) {
    const res = await API.post("/students", data);
    return res.data.message;
  },

  async getAllStudents() {
    const res = await API.get("/students");
    return res.data.data;
  },
};

export default StudentService;
