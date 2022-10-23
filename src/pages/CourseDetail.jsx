import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TiTick, TiCancel } from "react-icons/ti";
import Table from "../components/Table";
import { useDispatch, useSelector } from "react-redux";
import { HTTP_STATUS } from "../api/httpStatusConstants";
import Spinner from "../components/Spinner";
import { handleConfirm } from "../utils/handleConfirm";
import {
  getCourseStudent,
  getRegisterStatus,
  getUserListWaitingForApproval,
  resetRegisterStatus,
  selectStudentOfCourse,
  subscribeCourse,
  unsubscribeCourse,
} from "../redux/registerSlice";

const leftColumns = [
  { field: "taiKhoan", headerName: "Username", width: 130 },
  { field: "biDanh", headerName: "Aliases", width: 150 },
  { field: "hoTen", headerName: "Full name", width: 150 },
  {
    field: "register",
    headerName: "Register",
    width: 100,
    renderCell: () => (
      <TiTick className="text-xl text-green-500 hover:cursor-pointer" />
    ),
    align: "center",
  },
  {
    field: "cancel",
    headerName: "Cancel",
    width: 100,
    renderCell: () => (
      <TiCancel className="text-xl text-red-500 hover:cursor-pointer" />
    ),
    align: "center",
  },
];

const rightColumns = [
  { field: "taiKhoan", headerName: "Username", width: 130 },
  { field: "biDanh", headerName: "Aliases", width: 150 },
  { field: "hoTen", headerName: "Full name", width: 150 },
  {
    field: "cancel",
    headerName: "Cancel",
    width: 100,
    renderCell: () => (
      <TiCancel className="text-xl text-red-500 hover:cursor-pointer" />
    ),
    align: "center",
  },
];

const CourseDetail = () => {
  const [isLeft, setIsLeft] = useState(true);
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const students = useSelector(selectStudentOfCourse);
  const status = useSelector(getRegisterStatus);

  useEffect(() => {
    handleReload();
  }, [dispatch, isLeft, courseId]);

  const handleReload = () => {
    isLeft
      ? dispatch(getUserListWaitingForApproval(courseId))
      : dispatch(getCourseStudent(courseId));
  };

  const handleClick = async (e) => {
    if (e.field === "register") {
      await dispatch(subscribeCourse({ courseId, username: e.row.taiKhoan }));
      handleReload();
    } else if (e.field === "cancel") {
      handleConfirm(async (courseId, username) => {
        await dispatch(unsubscribeCourse({ courseId, username }));
        handleReload();
      })(courseId, e.row.taiKhoan);
    }
  };

  const headerButtonStyle =
    "p-2 sm:p-4 text-sm sm:text-lg font-semibold flex-1 text-center bg-slate-400 cursor-pointer";

  const activeHeaderButtonStyle = "bg-lime-400 -translate-y-1";

  if (status === HTTP_STATUS.FULFILLED) {
    dispatch(resetRegisterStatus());
  }
  if (!students) {
    return <Spinner />;
  }

  return (
    <div className="mt-20">
      <header>
        <h1 className="text-xl sm:text-2xl text-center font-bold mb-4 sm:mb-8">
          {courseId}
        </h1>
        <div className="flex justify-around">
          <h1
            className={`rounded-l-xl ${headerButtonStyle} ${
              isLeft && activeHeaderButtonStyle
            }`}
            onClick={() => setIsLeft(true)}
          >
            Danh sach hoc vien cho xet duyet
          </h1>
          <h1
            className={`rounded-r-xl ${headerButtonStyle} ${
              !isLeft && activeHeaderButtonStyle
            }`}
            onClick={() => setIsLeft(false)}
          >
            Danh sach hoc vien khoa hoc
          </h1>
        </div>
      </header>
      <Table
        rows={students}
        columns={isLeft ? leftColumns : rightColumns}
        getRowId={(row) => row.taiKhoan}
        loading={status === HTTP_STATUS.PENDING}
        onCellClick={handleClick}
      />
    </div>
  );
};

export default CourseDetail;
