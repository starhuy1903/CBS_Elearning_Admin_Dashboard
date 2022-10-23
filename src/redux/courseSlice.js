import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import swal from "sweetalert";
import api from "../api/api";
import { HTTP_STATUS } from "../api/httpStatusConstants";

export const getCourseById = createAsyncThunk(
  "course/getCourseById",
  async (id) => {
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
      swal({
        title: "Failed",
        text: err.response.data,
        icon: "error",
      });
    }
  },
  {
    condition: (__, { getState }) => {
      const { course } = getState();
      return course.status !== HTTP_STATUS.PENDING;
    },
  }
);

export const getCourseList = createAsyncThunk(
  "course/getCourseList",
  async () => {
    try {
      const res = await api.request({
        url: "/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc",
        method: "GET",
        params: {
          MaNhom: "GP01",
        },
      });
      return res.data;
    } catch (err) {
      swal({
        title: "Failed",
        text: err.response.data,
        icon: "error",
      });
    }
  },
  {
    condition: (__, { getState }) => {
      const { course } = getState();
      return course.status !== HTTP_STATUS.PENDING;
    },
  }
);

export const getCourseListByCategory = createAsyncThunk(
  "course/getCourseListByCategory",
  async (category) => {
    try {
      const res = await api.request({
        url: "/api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc",
        method: "GET",
        params: {
          maDanhMuc: category,
          MaNhom: "GP01",
        },
      });

      return res.data;
    } catch (err) {
      swal({
        title: "Failed",
        text: err.response.data,
        icon: "error",
      });
    }
  },
  {
    condition: (__, { getState }) => {
      const { course } = getState();
      return course.status !== HTTP_STATUS.PENDING;
    },
  }
);

export const addCourse = createAsyncThunk(
  "course/addCourse",
  async (courseFormData) => {
    try {
      await api.request({
        url: "/api/QuanLyKhoaHoc/ThemKhoaHocUploadHinh",
        method: "POST",
        data: courseFormData,
      });

      swal({
        title: "Successful",
        text: "Course information added successful",
        icon: "success",
      });
    } catch (err) {
      swal({
        title: "Failed",
        text: err.response.data,
        icon: "error",
      });
    }
  },
  {
    condition: (__, { getState }) => {
      const { course } = getState();
      return course.status !== HTTP_STATUS.PENDING;
    },
  }
);

export const updateCourse = createAsyncThunk(
  "course/updateCourse",
  async (courseFormData) => {
    try {
      await api.request({
        url: "/api/QuanLyKhoaHoc/CapNhatKhoaHocUpload",
        method: "POST",
        data: courseFormData,
      });
      swal({
        title: "Successful",
        text: "Course information updated successful",
        icon: "success",
      });
    } catch (err) {
      swal({
        title: "Failed",
        text: err.response.data,
        icon: "error",
      });
    }
  },
  {
    condition: (__, { getState }) => {
      const { course } = getState();
      return course.status !== HTTP_STATUS.PENDING;
    },
  }
);

export const deleteCourse = createAsyncThunk(
  "course/deleteCourse",
  async (courseId) => {
    try {
      await api.request({
        url: "/api/QuanLyKhoaHoc/XoaKhoaHoc",
        method: "DELETE",
        params: {
          MaKhoaHoc: courseId,
        },
      });
      swal({
        title: "Successful",
        text: "Course deleted successful",
        icon: "success",
      });
    } catch (err) {
      swal({
        title: "Failed",
        text: err.response.data,
        icon: "error",
      });
    }
  },
  {
    condition: (__, { getState }) => {
      const { course } = getState();
      return course.status !== HTTP_STATUS.PENDING;
    },
  }
);

const initialState = {
  data: null,
  status: HTTP_STATUS.IDLE,
  error: null,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    resetCourseStatus(state) {
      state.status = HTTP_STATUS.IDLE;
    },
  },
  extraReducers(builder) {
    builder
      // getCourseById
      .addCase(getCourseById.pending, (state) => {
        state.status = HTTP_STATUS.PENDING;
      })
      .addCase(getCourseById.fulfilled, (state, action) => {
        state.status = HTTP_STATUS.FULFILLED;
        state.data = action.payload;
      })
      .addCase(getCourseById.rejected, (state) => {
        state.status = HTTP_STATUS.REJECTED;
      })
      // getCourseList
      .addCase(getCourseList.pending, (state) => {
        state.status = HTTP_STATUS.PENDING;
      })
      .addCase(getCourseList.fulfilled, (state, action) => {
        state.status = HTTP_STATUS.FULFILLED;
        state.data = action.payload;
      })
      .addCase(getCourseList.rejected, (state, action) => {
        state.status = HTTP_STATUS.REJECTED;
        state.error = action.payload;
      })
      // getCourseListByCategory
      .addCase(getCourseListByCategory.pending, (state) => {
        state.status = HTTP_STATUS.PENDING;
      })
      .addCase(getCourseListByCategory.fulfilled, (state, action) => {
        state.status = HTTP_STATUS.FULFILLED;
        state.data = action.payload;
      })
      .addCase(getCourseListByCategory.rejected, (state, action) => {
        state.status = HTTP_STATUS.REJECTED;
        state.error = action.payload;
      });
  },
});

export const selectCourseDetail = (state) => state.course.data;
export const getCourseStatus = (state) => state.course.status;
export const getCourseError = (state) => state.course.error;

export const selectCourses = (state) => state.course.data;

export const { resetCourseStatus } = courseSlice.actions;

export default courseSlice.reducer;
