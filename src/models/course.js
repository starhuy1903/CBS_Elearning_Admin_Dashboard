import * as yup from "yup";

export const validatedCourseSchema = yup.object().shape({
  maKhoaHoc: yup
    .string()
    .required("This field is required")
    .matches(/^[A-Za-z0-9]+/g, "Id only contains character and number"),
  biDanh: yup
    .string()
    .required("This field is required")
    .matches(/^[A-Za-z0-9]+/g, "Id only contains character and number"),
  tenKhoaHoc: yup.string().required("This field is required"),
  maDanhMucKhoaHoc: yup.string().required("You must choose one category"),
});
