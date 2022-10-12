import axios from "axios";
import swal from "sweetalert";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

api.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: "Bearer " + localStorage.getItem("token"),
  };
  return config;
});

export const addUser = async (user) => {
  try {
    const res = await api.request({
      url: "/api/QuanLyNguoiDung/ThemNguoiDung",
      method: "POST",
      data: user,
    });

    swal({
      title: "Successful",
      text: "Add user successfully",
      icon: "success",
    });

    return res;
  } catch (err) {
    swal({
      title: "Failed",
      text: err.response.data,
      icon: "error",
    });
  }
};

export const updateUser = async (user) => {
  try {
    const res = await api.request({
      url: "/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      method: "PUT",
      data: user,
    });

    swal({
      title: "Successful",
      text: "User information updated successful",
      icon: "success",
    });
    return res;
  } catch (err) {
    swal({
      title: "Failed",
      text: err.response.data,
      icon: "error",
    });
  }
};

export const deleteUser = async (username) => {
  try {
    const res = await api.request({
      url: "/api/QuanLyNguoiDung/XoaNguoiDung",
      method: "DELETE",
      params: {
        TaiKhoan: username,
      },
    });

    swal({
      title: "Successful",
      text: "Delete user successful",
      icon: "success",
    });
    return res;
  } catch (err) {
    swal({
      title: "Failed",
      text: err.response.data,
      icon: "error",
    });
  }
};

export default api;
