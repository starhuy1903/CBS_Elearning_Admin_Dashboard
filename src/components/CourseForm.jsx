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
import { BsPencilSquare } from "react-icons/bs";
import { getCourseCategories } from "../api/api";
import { validatedCourseSchema } from "../models/course";
import { useDispatch } from "react-redux";
import { addCourse, updateCourse } from "../redux/courseSlice";
import Spinner from "./Spinner";

const CourseForm = ({ courseInfo, isUpdating }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState();
  const [imgSrc, setImgSrc] = useState(null);
  // const [selectedFile, setSelectedFile] = useState();
  // const [preview, setPreview] = useState();

  const formik = useFormik({
    initialValues: courseInfo,
    onSubmit: (values, { resetForm }) => {
      const formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          // if (!values[key].includes("https")) {
          //   formData.append("File", values[key], values[key].name);
          // } else {
          //   formData.append("hinhAnh", null);
          // }
          console.log(values[key]);
          formData.append("hinhAnh", values[key], "hinhAnh.jpg");
        }
      }

      if (isUpdating) {
        dispatch(updateCourse(formData));
      } else {
        dispatch(addCourse(formData));
      }
      resetForm();
    },
    validationSchema: validatedCourseSchema,
    validateOnChange: false,
    validateOnBlur: true,
  });

  console.log(formik.values);

  const handleChangeFile = (e) => {
    const file = e.target.files[0];

    if ([("image/jpeg", "image/jpg", "image/png")].includes(file.type)) {
      const reader = new FileReader();
      const url = reader.readAsDataURL(file);

      console.log(url);

      reader.onload = (e) => {
        setImgSrc(e.target.result);
      };
    }

    formik.setFieldValue("hinhAnh", file);
  };

  // useEffect(() => {
  //   if (!selectedFile) {
  //     setPreview(undefined);
  //     return;
  //   }

  //   const objectUrl = URL.createObjectURL(selectedFile);
  //   setPreview(objectUrl);
  //   console.log(objectUrl);
  //   formik.setFieldValue("hinhAnh", objectUrl);

  //   return () => URL.revokeObjectURL(objectUrl);
  // }, [selectedFile]);

  // console.log(imgSrc, formik.values.hinhAnh);

  // const onSelectFile = (e) => {
  //   if (!e.target.files || e.target.files.length === 0) {
  //     setSelectedFile(undefined);
  //     return;
  //   }

  //   setSelectedFile(e.target.files[0]);
  // };

  useEffect(() => {
    getCourseCategories(setCategories);
  }, []);

  if (!categories) return <Spinner />;

  return (
    <Box
      className="mt-12 md:m-10 p-8 md:p-10 bg-white rounded-3xl"
      component="form"
      onSubmit={formik.handleSubmit}
    >
      <h1 className="text-center font-bold text-3xl mb-8">
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
        <div className="flex items-center space-x-6 w-4/5">
          <div className="shrink-0">
            <img
              className="h-16 w-16 object-cover rounded"
              src={imgSrc}
              alt=""
            />
          </div>
          <label className="block">
            <span className="sr-only">Choose profile photo</span>
            <input
              name="hinhAnh"
              type="file"
              onChange={handleChangeFile}
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
