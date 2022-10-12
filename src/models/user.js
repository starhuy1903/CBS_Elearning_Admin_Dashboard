import * as yup from "yup";

export const validatedUserSchema = yup.object().shape({
  taiKhoan: yup.string().required("This field is required"),
  matKhau: yup
    .string()
    .required("This field is required")
    .min(8, "Min length is 8 letter"),
  hoTen: yup
    .string()
    .required("This field is required")
    .matches(/^[A-Za-z ]+/g, "Name must be a letter"),
  email: yup
    .string()
    .required("This field is required")
    .email("Email is not correct format"),
  soDt: yup.string().required("This field is required"),
});
