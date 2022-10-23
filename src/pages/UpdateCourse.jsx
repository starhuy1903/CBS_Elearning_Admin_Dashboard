import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { HTTP_STATUS } from "../api/httpStatusConstants";
import CourseForm from "../components/CourseForm";
import Spinner from "../components/Spinner";
import {
  getCourseById,
  getCourseStatus,
  resetCourseStatus,
  selectCourseDetail,
} from "../redux/courseSlice";

const UpdateCourse = () => {
  const dispatch = useDispatch();
  const course = useSelector(selectCourseDetail);
  const status = useSelector(getCourseStatus);

  const { courseId } = useParams();

  useEffect(() => {
    dispatch(getCourseById(courseId));
  }, [dispatch, courseId]);

  if (status === HTTP_STATUS.PENDING || !course) {
    return <Spinner />;
  } else if (status === HTTP_STATUS.FULFILLED) {
    dispatch(resetCourseStatus());
  }

  return (
    <CourseForm
      courseInfo={{
        ...course,
        maDanhMucKhoaHoc: course?.danhMucKhoaHoc?.maDanhMucKhoahoc,
        taiKhoanNguoiTao: course?.nguoiTao?.taiKhoan,
      }}
      isUpdating={true}
    />
  );
};

export default UpdateCourse;
