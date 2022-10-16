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

export const findUserByUsername = async (searchTerm, setUsers) => {
  try {
    const res = await api.request({
      url: "/api/QuanLyNguoiDung/TimKiemNguoiDung",
      method: "GET",
      params: {
        MaNhom: "GP02",
        tuKhoa: searchTerm,
      },
    });
    setUsers(res.data.map((user, index) => ({ ...user, id: index + 1 })));
    // return res.data.map((user, index) => ({ ...user, id: index + 1 }));
  } catch (err) {
    console.log(err);
  }
};

export const getUserList = async (setUsers) => {
  try {
    const res = await api.request({
      url: "/api/QuanLyNguoiDung/LayDanhSachNguoiDung",
      method: "GET",
    });
    setUsers(res.data.map((user, index) => ({ ...user, id: index + 1 })));
  } catch (err) {
    console.log(err);
  }
};

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

export const getCourseList = async (setCourses) => {
  try {
    const res = await api.request({
      url: "/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc",
      method: "GET",
      params: {
        MaNhom: "GP01",
      },
    });
    setCourses(res.data.map((course, index) => ({ ...course, id: index + 1 })));
  } catch (err) {
    console.log(err);
  }
};

export const getCourseListByCategory = async (setCourses, category) => {
  try {
    const res = await api.request({
      url: "/api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc",
      method: "GET",
      params: {
        maDanhMuc: category,
        MaNhom: "GP01",
      },
    });
    setCourses(res.data.map((course, index) => ({ ...course, id: index + 1 })));
  } catch (err) {
    console.log(err);
  }
};

export default api;
