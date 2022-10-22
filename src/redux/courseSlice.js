import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import swal from "sweetalert";
import api from "../api/api";
import { HTTP_STATUS } from "../api/httpStatusConstants";

export const getCourseById = createAsyncThunk(
  "course/getCourseById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.request({
        url: "/api/QuanLyKhoaHoc/LayThongTinKhoaHoc",
        method: "GET",
        params: {
          maKhoaHoc: id,
        },
      });

      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const addCourse = createAsyncThunk(
  "course/addCourse",
  async (course, { rejectWithValue }) => {
    try {
      const res = await api.request({
        url: "/api/QuanLyKhoaHoc/ThemKhoaHoc",
        method: "POST",
        data: course,
      });
      swal({
        title: "Successful",
        text: "Course information added successful",
        icon: "success",
      });

      return res.data;
    } catch (err) {
      swal({
        title: "Failed",
        text: err.response.data,
        icon: "error",
      });
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateCourse = createAsyncThunk(
  "course/updateCourse",
  async (course, { rejectWithValue }) => {
    try {
      const res = await api.request({
        url: "/api/QuanLyKhoaHoc/CapNhatKhoaHoc",
        method: "PUT",
        data: course,
      });
      swal({
        title: "Successful",
        text: "Course information updated successful",
        icon: "success",
      });

      return res.data;
    } catch (err) {
      swal({
        title: "Failed",
        text: err.response.data,
        icon: "error",
      });
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  data: null,
  status: null,
  error: null,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCourseById.pending, (state) => {
        state.status = HTTP_STATUS.PENDING;
      })
      .addCase(getCourseById.fulfilled, (state, action) => {
        state.status = HTTP_STATUS.FULFILLED;
        state.data = action.payload;
      })
      .addCase(getCourseById.rejected, (state, action) => {
        state.status = HTTP_STATUS.REJECTED;
        state.error = action.payload;
      });
  },
});

export const selectCourseDetail = (state) => state.course.data;
export const getCourseStatus = (state) => state.course.status;
export const getCourseError = (state) => state.course.error;

export default courseSlice.reducer;
