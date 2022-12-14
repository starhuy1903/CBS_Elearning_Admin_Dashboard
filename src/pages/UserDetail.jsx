import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TiTick, TiCancel } from "react-icons/ti";
import Table from "../components/Table";
import { useDispatch, useSelector } from "react-redux";
import { HTTP_STATUS } from "../api/httpStatusConstants";
import Spinner from "../components/Spinner";
import { handleConfirm } from "../utils/handleConfirm";
import {
  getRegisterStatus,
  getStudiedCourseByUsername,
  getWaitingCourseByUsername,
  resetRegisterStatus,
  selectCourseOfStudent,
  subscribeCourse,
  unsubscribeCourse,
} from "../redux/registerSlice";

const leftColumns = [
  { field: "maKhoaHoc", headerName: "Course Id", width: 130 },
  { field: "tenKhoaHoc", headerName: "Course Name", width: 150 },
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
  { field: "maKhoaHoc", headerName: "Course Id", width: 130 },
  { field: "tenKhoaHoc", headerName: "Course Name", width: 150 },
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

const UserDetail = () => {
  const [isLeft, setIsLeft] = useState(true);
  const { username } = useParams();
  const dispatch = useDispatch();
  const courses = useSelector(selectCourseOfStudent);
  const status = useSelector(getRegisterStatus);

  useEffect(() => {
    handleReload();
  }, [dispatch, isLeft, username]);

  const handleReload = () => {
    isLeft
      ? dispatch(getWaitingCourseByUsername(username))
      : dispatch(getStudiedCourseByUsername(username));
  };

  const handleClick = async (e) => {
    if (e.field === "register") {
      await dispatch(subscribeCourse({ courseId: e.row.maKhoaHoc, username }));
      handleReload();
    } else if (e.field === "cancel") {
      handleConfirm(async (courseId, username) => {
        await dispatch(unsubscribeCourse({ courseId, username }));
        handleReload();
      })(e.row.maKhoaHoc, username);
    }
  };

  const headerButtonStyle =
    "p-2 sm:p-4 text-sm sm:text-lg font-semibold flex-1 text-center bg-slate-400 cursor-pointer";

  const activeHeaderButtonStyle = "bg-lime-400 -translate-y-1";

  if (status === HTTP_STATUS.FULFILLED) {
    dispatch(resetRegisterStatus());
  }
  if (!courses) {
    return <Spinner />;
  }

  return (
    <div className="mt-20">
      <header>
        <h1 className="text-xl sm:text-2xl text-center font-bold mb-4 sm:mb-8">
          {username}
        </h1>
        <div className="flex justify-around">
          <h1
            className={`rounded-l-xl ${headerButtonStyle} ${
              isLeft && activeHeaderButtonStyle
            }`}
            onClick={() => setIsLeft(true)}
          >
            Danh sach khoa hoc cho xet duyet
          </h1>
          <h1
            className={`rounded-r-xl ${headerButtonStyle} ${
              !isLeft && activeHeaderButtonStyle
            }`}
            onClick={() => setIsLeft(false)}
          >
            Danh sach khoa hoc da mua
          </h1>
        </div>
      </header>
      <Table
        rows={courses}
        columns={isLeft ? leftColumns : rightColumns}
        getRowId={(row) => row.maKhoaHoc}
        loading={status === HTTP_STATUS.PENDING}
        onCellClick={handleClick}
      />
    </div>
  );
};

export default UserDetail;
