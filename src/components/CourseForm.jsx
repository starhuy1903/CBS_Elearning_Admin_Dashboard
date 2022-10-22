import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import { getCourseCategories } from "../api/api";
import swal from "sweetalert";
import { validatedCourseSchema } from "../models/course";
import { useDispatch } from "react-redux";
import { addCourse, updateCourse } from "../redux/courseSlice";

const CourseForm = ({ courseInfo, isUpdating }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState();

  const formik = useFormik({
    initialValues: courseInfo,
    onSubmit: (values) => {
      if (isUpdating) {
        dispatch(updateCourse(values));
      } else {
        dispatch(addCourse(values));
      }
      console.log(values);
    },
    validationSchema: validatedCourseSchema,
    validateOnChange: false,
    validateOnBlur: true,
  });

  console.log(formik.values);

  useEffect(() => {
    getCourseCategories(setCategories);
  }, []);

  if (!categories) return <h1>Loading...</h1>;

  return (
    <Box
      className="mt-24 md:m-10 p-8 md:p-10 bg-white rounded-3xl"
      component="form"
      onSubmit={formik.handleSubmit}
    >
      <h1 className="text-center font-bold text-3xl my-8">
        {isUpdating ? "Update" : "Add"} course
      </h1>
      <div className="flex flex-wrap justify-center gap-4">
        <TextField
          error={
            Boolean(formik.touched.maKhoaHoc) &&
            Boolean(formik.errors.maKhoaHoc)
          }
          label="Course Id"
          value={formik.values.maKhoaHoc}
          helperText={formik.touched.maKhoaHoc && formik.errors.maKhoaHoc}
          name="maKhoaHoc"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-4/5 sm:w-2/5"
        />
        <TextField
          error={
            Boolean(formik.touched.biDanh) && Boolean(formik.errors.biDanh)
          }
          label="Aliases"
          value={formik.values.biDanh}
          helperText={formik.touched.biDanh && formik.errors.biDanh}
          name="biDanh"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-4/5 sm:w-2/5"
        />
        <TextField
          error={
            Boolean(formik.touched.tenKhoaHoc) &&
            Boolean(formik.errors.tenKhoaHoc)
          }
          label="Course name"
          value={formik.values.tenKhoaHoc}
          helperText={formik.touched.tenKhoaHoc && formik.errors.tenKhoaHoc}
          name="tenKhoaHoc"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-4/5 sm:w-2/5"
        />
        <FormControl
          className="w-4/5 sm:w-2/5"
          error={
            Boolean(formik.touched.maDanhMucKhoaHoc) &&
            Boolean(formik.errors.maDanhMucKhoaHoc)
          }
        >
          <InputLabel>Category</InputLabel>
          <Select
            label="Category"
            name="maDanhMucKhoaHoc"
            value={formik.values.maDanhMucKhoaHoc}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {categories.map((category) => (
              <MenuItem key={category.maDanhMuc} value={category.maDanhMuc}>
                {category.tenDanhMuc}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            {formik.touched.maDanhMucKhoaHoc && formik.errors.maDanhMucKhoaHoc}
          </FormHelperText>
        </FormControl>
        {/* <TextField
          disabled
          value={formik.values.ngayTao.toISOString()}
          id="outlined-disabled"
          className="w-4/5 sm:w-2/5"
        /> */}
        <div className="flex items-center space-x-6 w-4/5">
          <div className="shrink-0">
            <img
              className="h-16 w-16 object-cover rounded"
              src={formik.values.hinhAnh}
              alt=""
            />
          </div>
          <label class="block">
            <span class="sr-only">Choose profile photo</span>
            {/* <TextField
              error={
                Boolean(formik.touched.hinhAnh) &&
                Boolean(formik.errors.hinhAnh)
              }
              label="Image URL"
              // value={formik.values.hinhAnh}
              helperText={formik.touched.hinhAnh && formik.errors.hinhAnh}
              name="hinhAnh"
              type="file"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100"
            /> */}
            <input
              name="hinhAnh"
              type="file"
              accept="image/png, image/jpeg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.hinhAnh}
              className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "
            />
          </label>
        </div>
        <TextField
          label="Describe"
          name="moTa"
          multiline
          rows={4}
          value={formik.values.moTa}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-4/5"
        />
      </div>
      <div className="flex justify-center mt-4 gap-1">
        <button
          type="button"
          className="bg-slate-400 hover:bg-slate-200 rounded-xl font-semibold text-sm sm:text-lg px-4 sm:px-6  py-2 sm:py-4"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>

        {isUpdating && (
          <button
            type="button"
            className="bg-red-600 hover:bg-red-400 rounded-xl font-semibold text-sm sm:text-lg px-4 sm:px-6  py-2 sm:py-4 flex items-center"
            onClick={() => {
              swal({
                title: "Warning",
                text: "Are you sure to delete?",
                icon: "warning",
                buttons: {
                  cancel: {
                    text: "Cancel",
                    value: false,
                    visible: true,
                    closeModal: true,
                  },
                  confirm: {
                    text: "OK",
                    value: true,
                    visible: true,
                    closeModal: true,
                  },
                },
              }).then((isDeleted) => {
                if (isDeleted) {
                  //   deleteUser(userInfo.taiKhoan);
                  //   navigate(-1);
                }
              });
            }}
          >
            <BsFillTrashFill /> <span>Remove</span>
          </button>
        )}

        <button
          className="bg-teal-400 hover:bg-teal-200 px-4 sm:px-6  py-2 sm:py-4 rounded-xl text-center font-semibold text-sm sm:text-lg flex items-center"
          type="submit"
        >
          <BsPencilSquare /> <span>{isUpdating ? "Update" : "Add"}</span>
        </button>
      </div>
    </Box>
  );
};

export default CourseForm;
