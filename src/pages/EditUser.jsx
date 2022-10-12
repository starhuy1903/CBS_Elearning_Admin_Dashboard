import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";

import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import { addUser, deleteUser, updateUser } from "../api/api";
import { validatedUserSchema } from "../models/user";
import swal from "sweetalert";

const EditUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = location.state?.user;

  const isUpdating = userInfo ? true : false;

  const formik = useFormik({
    initialValues: {
      taiKhoan: userInfo?.taiKhoan || "",
      matKhau: "",
      hoTen: userInfo?.hoTen || "",
      email: userInfo?.email || "",
      soDt: userInfo?.soDt || "",
      maLoaiNguoiDung: userInfo?.maLoaiNguoiDung || "HV",
      maNhom: "GP02",
    },
    onSubmit: async (values, { resetForm }) => {
      let res;
      if (isUpdating) {
        res = await updateUser(values);
      } else {
        res = await addUser(values);
      }

      if (res.status === 200) {
        navigate(-1);
      }
      resetForm();
    },
    validationSchema: validatedUserSchema,
    validateOnChange: false,
    validateOnBlur: true,
  });

  return (
    <Box
      className="mt-24 md:m-10 p-2 md:p-10 bg-white rounded-3xl"
      component="form"
      onSubmit={formik.handleSubmit}
    >
      <h1 className="text-center font-bold text-3xl my-8">
        {isUpdating ? "Update" : "Add"} user
      </h1>
      <div className="flex flex-wrap justify-center gap-4">
        <TextField
          error={
            Boolean(formik.touched.taiKhoan) && Boolean(formik.errors.taiKhoan)
          }
          label="Username"
          value={formik.values.taiKhoan}
          helperText={formik.touched.taiKhoan && formik.errors.taiKhoan}
          name="taiKhoan"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-4/5 sm:w-2/5"
        />
        <TextField
          error={
            Boolean(formik.touched.matKhau) && Boolean(formik.errors.matKhau)
          }
          label="Password"
          value={formik.values.matKhau}
          type="password"
          helperText={formik.touched.matKhau && formik.errors.matKhau}
          name="matKhau"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-4/5 sm:w-2/5"
        />
        <TextField
          error={Boolean(formik.touched.hoTen) && Boolean(formik.errors.hoTen)}
          label="Full name"
          value={formik.values.hoTen}
          helperText={formik.touched.hoTen && formik.errors.hoTen}
          name="hoTen"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-4/5 sm:w-2/5"
        />
        <TextField
          error={Boolean(formik.touched.email) && Boolean(formik.errors.email)}
          label="Email"
          value={formik.values.email}
          helperText={formik.touched.email && formik.errors.email}
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-4/5 sm:w-2/5"
        />
        <TextField
          error={Boolean(formik.touched.soDt) && Boolean(formik.errors.soDt)}
          label="Phone number"
          value={formik.values.soDt}
          helperText={formik.touched.soDt && formik.errors.soDt}
          name="soDt"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-4/5 sm:w-2/5"
        />
        <FormControl className="w-4/5 sm:w-2/5">
          <InputLabel>Type Account</InputLabel>
          <Select
            name="maLoaiNguoiDung"
            value={formik.values.maLoaiNguoiDung}
            onChange={formik.handleChange}
          >
            <MenuItem value={"HV"}>HV</MenuItem>
            <MenuItem value={"GV"}>GV</MenuItem>
          </Select>
        </FormControl>
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
                  deleteUser(userInfo.taiKhoan);
                  navigate(-1);
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
          <BsPencilSquare /> <span>{userInfo ? "Update" : "Add"}</span>
        </button>
      </div>
    </Box>
  );
};

export default EditUser;
