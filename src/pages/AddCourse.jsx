import React from "react";
import { useSelector } from "react-redux";
import CourseForm from "../components/CourseForm";
import { selectProfile } from "../redux/authSlice";
import { formatDate } from "../utils/formatDate";

const AddCourse = () => {
  const profile = useSelector(selectProfile);

  if (!profile) return <h1>Loading...</h1>;

  const course = {
    maKhoaHoc: "",
    biDanh: "",
    tenKhoaHoc: "",
    moTa: "",
    hinhAnh: "",
    taiKhoanNguoiTao: profile.taiKhoan,
    maDanhMucKhoaHoc: "",
    ngayTao: formatDate(new Date()),
    maNhom: "GP01",
    luotXem: 0,
    danhGia: 0,
  };

  return <CourseForm courseInfo={course} isUpdating={false} />;
};

export default AddCourse;
