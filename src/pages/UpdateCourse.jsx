import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { HTTP_STATUS } from "../api/httpStatusConstants";
import CourseForm from "../components/CourseForm";
import {
  getCourseById,
  getCourseError,
  getCourseStatus,
  selectCourseDetail,
} from "../redux/courseSlice";

const UpdateCourse = () => {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const course = useSelector(selectCourseDetail);
  console.log(course);
  const status = useSelector(getCourseStatus);
  const error = useSelector(getCourseError);

  useEffect(() => {
    dispatch(getCourseById(courseId));
  }, [dispatch, courseId]);

  let content;
  if (status === HTTP_STATUS.PENDING) {
    content = <h1>Loading...</h1>;
  } else if (status === HTTP_STATUS.FULFILLED) {
    // console.log(course);
    content = (
      <CourseForm
        courseInfo={{
          ...course,
          maDanhMucKhoaHoc: course.danhMucKhoaHoc.maDanhMucKhoahoc,
          taiKhoanNguoiTao: course.nguoiTao.taiKhoan,
        }}
        isUpdating={true}
      />
    );
  } else if (status === HTTP_STATUS.REJECTED) {
    console.log(error);
  }

  return <>{content}</>;
};

export default UpdateCourse;
