import React, { useEffect } from "react";
import videoBg from "../assets/videos/videoBg.mp4";
import * as yup from "yup";
import { useFormik } from "formik";
import { getAuthStatus, login } from "../redux/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { HTTP_STATUS } from "../api/httpStatusConstants";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  taiKhoan: yup.string().required("This field is required"),
  matKhau: yup.string().required("This field is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector(getAuthStatus);

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    onSubmit: (user, { resetForm }) => {
      dispatch(login(user));

      resetForm();
    },
    validationSchema: schema,
    validateOnChange: false,
    validateOnBlur: true,
  });

  useEffect(() => {
    if (status === HTTP_STATUS.FULFILLED) {
      navigate("/");
    }
  }, [navigate, status]);

  return (
    <div className="w-full h-screen">
      <video
        className="w-full h-full object-cover"
        src={videoBg}
        autoPlay
        loop
        muted
      />
      <div className="absolute w-full h-full top-0 flex flex-col justify-center items-center text-white">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col items-center"
        >
          <h3 className="font-semibold text-3xl mb-6 text-teal-400">Sign in</h3>
          <div className="flex flex-col">
            <label htmlFor="">Username</label>
            <input
              name="taiKhoan"
              className="bg-transparent border-slate-300 border px-4 py-2 my-2 rounded outline-0"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Password</label>
            <input
              name="matKhau"
              className="bg-transparent border-slate-300 border  px-4 py-2 my-2 rounded outline-0"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <button
            type="submit"
            className="bg-teal-400 px-8 py-4 mt-4 rounded-xl text-center font-bold text-lg hover:bg-white hover:text-teal-400"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
