import axios from "axios";
import swal from "sweetalert";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    TokenCybersoft: process.env.REACT_APP_TOKEN_CYBERSOFT,
  },
});

api.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: "Bearer " + localStorage.getItem("token"),
  };
  return config;
});

export const getCourseCategories = async (setCategories) => {
  try {
    const res = await api.request({
      url: "/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc",
      method: "GET",
      params: {
        MaNhom: "GP01",
      },
    });
    setCategories(res.data);
  } catch (err) {
    console.log(err);
  }
};

export default api;
