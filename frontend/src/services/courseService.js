import API from "../api/axios.js";

const CourseService = {
  async getAllCourses() {
    const res = await API.get("/courses")
    return res.data.data;
  },
};

export default CourseService;
