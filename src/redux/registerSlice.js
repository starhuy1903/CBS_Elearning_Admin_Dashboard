import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import swal from "sweetalert";
import api from "../api/api";
import { HTTP_STATUS } from "../api/httpStatusConstants";

export const getUserListWaitingForApproval = createAsyncThunk(
  "register/getUserListWaitingForApproval",
  async (courseId) => {
    try {
      const res = await api.request({
        url: "/api/QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet",
        method: "POST",
        data: {
          maKhoaHoc: courseId,
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
      const { register } = getState();
      return register.status !== HTTP_STATUS.PENDING;
    },
  }
);

export const getCourseStudent = createAsyncThunk(
  "register/getCourseStudent",
  async (courseId) => {
    try {
      const res = await api.request({
        url: "/api/QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc",
        method: "POST",
        data: {
          maKhoaHoc: courseId,
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
      const { register } = getState();
      return register.status !== HTTP_STATUS.PENDING;
    },
  }
);

export const subscribeCourse = createAsyncThunk(
  "register/subscribeCourse",
  async ({ courseId, username }) => {
    try {
      await api.request({
        url: "/api/QuanLyKhoaHoc/GhiDanhKhoaHoc",
        method: "POST",
        data: {
          maKhoaHoc: courseId,
          taiKhoan: username,
        },
      });

      swal({
        title: "Successful",
        text: "User subscribes the course successfully",
        icon: "success",
      });
    } catch (err) {
      swal({
        title: "Failed",
        text: err.response.data,
        icon: "error",
      });
    }
  }
);

export const unsubscribeCourse = createAsyncThunk(
  "register/unsubscribeCourse",
  async ({ courseId, username }) => {
    try {
      await api.request({
        url: "/api/QuanLyKhoaHoc/HuyGhiDanh",
        method: "POST",
        data: {
          maKhoaHoc: courseId,
          taiKhoan: username,
        },
      });

      swal({
        title: "Successful",
        text: "User unsubscribes the course successfully",
        icon: "success",
      });
    } catch (err) {
      swal({
        title: "Failed",
        text: err.response.data,
        icon: "error",
      });
    }
  }
);

export const getStudiedCourseByUsername = createAsyncThunk(
  "register/getStudiedCourseByUsername",
  async (username) => {
    try {
      const res = await api.request({
        url: "/api/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet",
        method: "POST",
        data: {
          taiKhoan: username,
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
      const { register } = getState();
      return register.status !== HTTP_STATUS.PENDING;
    },
  }
);

export const getWaitingCourseByUsername = createAsyncThunk(
  "register/getWaitingCourseByUsername",
  async (username) => {
    try {
      const res = await api.request({
        url: "/api/QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet",
        method: "POST",
        data: {
          taiKhoan: username,
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
      const { register } = getState();
      return register.status !== HTTP_STATUS.PENDING;
    },
  }
);

const initialState = {
  students: null,
  courses: null,
  status: HTTP_STATUS.IDLE,
  error: null,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    resetRegisterStatus(state) {
      state.status = HTTP_STATUS.IDLE;
    },
  },
  extraReducers(builder) {
    builder
      // getUserListWaitingForApproval
      .addCase(getUserListWaitingForApproval.pending, (state) => {
        state.status = HTTP_STATUS.PENDING;
      })
      .addCase(getUserListWaitingForApproval.fulfilled, (state, action) => {
        state.status = HTTP_STATUS.FULFILLED;
        state.students = action.payload;
      })
      .addCase(getUserListWaitingForApproval.rejected, (state, action) => {
        state.status = HTTP_STATUS.REJECTED;
        state.error = action.payload;
      })
      // getCourseStudent
      .addCase(getCourseStudent.pending, (state) => {
        state.status = HTTP_STATUS.PENDING;
      })
      .addCase(getCourseStudent.fulfilled, (state, action) => {
        state.status = HTTP_STATUS.FULFILLED;
        state.students = action.payload;
      })
      .addCase(getCourseStudent.rejected, (state, action) => {
        state.status = HTTP_STATUS.REJECTED;
        state.error = action.payload;
      })
      // subscribeCourse
      .addCase(subscribeCourse.pending, (state) => {
        state.status = HTTP_STATUS.PENDING;
      })
      .addCase(subscribeCourse.fulfilled, (state) => {
        state.status = HTTP_STATUS.FULFILLED;
      })
      .addCase(subscribeCourse.rejected, (state) => {
        state.status = HTTP_STATUS.REJECTED;
      })
      // unsubscribeCourse
      .addCase(unsubscribeCourse.pending, (state) => {
        state.status = HTTP_STATUS.PENDING;
      })
      .addCase(unsubscribeCourse.fulfilled, (state) => {
        state.status = HTTP_STATUS.FULFILLED;
      })
      .addCase(unsubscribeCourse.rejected, (state) => {
        state.status = HTTP_STATUS.REJECTED;
      })
      // getStudiedCourseByUsername
      .addCase(getStudiedCourseByUsername.pending, (state) => {
        state.status = HTTP_STATUS.PENDING;
      })
      .addCase(getStudiedCourseByUsername.fulfilled, (state, action) => {
        state.status = HTTP_STATUS.FULFILLED;
        state.courses = action.payload;
      })
      .addCase(getStudiedCourseByUsername.rejected, (state, action) => {
        state.status = HTTP_STATUS.REJECTED;
        state.error = action.payload;
      })
      // getWaitingCourseByUsername
      .addCase(getWaitingCourseByUsername.pending, (state) => {
        state.status = HTTP_STATUS.PENDING;
      })
      .addCase(getWaitingCourseByUsername.fulfilled, (state, action) => {
        state.status = HTTP_STATUS.FULFILLED;
        state.courses = action.payload;
      })
      .addCase(getWaitingCourseByUsername.rejected, (state, action) => {
        state.status = HTTP_STATUS.REJECTED;
        state.error = action.payload;
      });
  },
});

export const selectCourseDetail = (state) => state.course.data;
export const getRegisterStatus = (state) => state.register.status;
export const getRegisterError = (state) => state.register.error;

export const selectStudentOfCourse = (state) => state.register.students;
export const selectCourseOfStudent = (state) => state.register.courses;

export const { resetRegisterStatus } = registerSlice.actions;

export default registerSlice.reducer;
