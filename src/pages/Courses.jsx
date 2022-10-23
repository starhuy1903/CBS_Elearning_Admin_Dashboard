import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BsEyeFill, BsPencilSquare, BsFillTrashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCourseCategories } from "../api/api";
import { HTTP_STATUS } from "../api/httpStatusConstants";
import Spinner from "../components/Spinner";
import Table from "../components/Table";
import {
  deleteCourse,
  getCourseList,
  getCourseListByCategory,
  getCourseStatus,
  resetCourseStatus,
  selectCourses,
} from "../redux/courseSlice";
import { handleConfirm } from "../utils/handleConfirm";

const columns = [
  {
    field: "tenKhoaHoc",
    headerName: "Course Name",
    width: 350,
    renderCell: ({ row }) => (
      <div className="flex items-center">
        <img className="w-1/4 object-cover mr-2" src={row.hinhAnh} alt="" />
        <div>
          <h3 className="font-semibold">{row.tenKhoaHoc}</h3>
          <p className="text-sm font-light">
            {row.danhMucKhoaHoc.tenDanhMucKhoaHoc}
          </p>
        </div>
      </div>
    ),
  },
  {
    field: "nguoiTaoKhoaHoc",
    headerName: "Creator",
    width: 110,
    valueGetter: (params) => `${params.row.nguoiTao.hoTen}`,
  },
  { field: "ngayTao", headerName: "Creation Day", width: 100 },
  {
    field: "view",
    headerName: "View",
    width: 50,
    renderCell: () => (
      <BsEyeFill className="text-xl text-green-500 hover:cursor-pointer" />
    ),
    align: "center",
  },
  {
    field: "edit",
    headerName: "Edit",
    width: 50,
    renderCell: () => (
      <BsPencilSquare className="text-xl text-orange-500 hover:cursor-pointer" />
    ),
    align: "center",
  },
  {
    field: "delete",
    headerName: "Delete",
    width: 70,
    renderCell: () => (
      <BsFillTrashFill className="text-xl text-red-500 hover:cursor-pointer" />
    ),
    align: "center",
  },
];

const Courses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector(getCourseStatus);
  const courses = useSelector(selectCourses);
  const [categories, setCategories] = useState();
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    handleReload();
  }, [selectedCategory]);

  useEffect(() => {
    getCourseCategories(setCategories);
  }, []);

  const handleReload = () => {
    selectedCategory !== "all"
      ? dispatch(getCourseListByCategory(selectedCategory))
      : dispatch(getCourseList());
  };

  const onDeleteHandle = handleConfirm(async (e) => {
    await dispatch(deleteCourse(e.row.maKhoaHoc));
    handleReload();
  });

  const handleClick = (e) => {
    if (e.field === "view") {
      navigate(`detail/${e.row.maKhoaHoc}`);
    } else if (e.field === "edit") {
      navigate(`update/${e.row.maKhoaHoc}`);
    } else if (e.field === "delete") {
      onDeleteHandle(e);
    }
  };

  if (status === HTTP_STATUS.FULFILLED) {
    dispatch(resetCourseStatus());
  }

  if (!courses || !categories) return <Spinner />;

  return (
    <div className="mt-12 sm:mt-16 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <h1 className="text-3xl text-center font-bold my-4">
        Courses Management
      </h1>
      <div className="flex justify-between my-4 ">
        <button
          className="bg-teal-400 hover:bg-teal-200 px-4 sm:px-6  py-2 sm:py-4 rounded-xl text-center font-semibold text-sm sm:text-lg"
          onClick={() => navigate("/courses/add")}
        >
          Add course
        </button>
        <FormControl className="w-1/2">
          <InputLabel>Course Category</InputLabel>
          <Select
            label="Course Category"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
            }}
          >
            <MenuItem value="all">All</MenuItem>
            {categories?.map((category) => (
              <MenuItem key={category.maDanhMuc} value={category.maDanhMuc}>
                {category.tenDanhMuc}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <Table
        rows={courses}
        columns={columns}
        onCellClick={handleClick}
        loading={status === HTTP_STATUS.PENDING}
        getRowId={(row) => row.maKhoaHoc}
      />
    </div>
  );
};

export default Courses;
