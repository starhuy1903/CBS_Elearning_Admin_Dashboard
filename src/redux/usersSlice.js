import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import swal from "sweetalert";
import api from "../api/api";
import { HTTP_STATUS } from "../api/httpStatusConstants";

export const addUser = createAsyncThunk(
  "users/addUser",
  async (user, { rejectWithValue }) => {
    try {
      const res = await api.request({
        url: "/api/QuanLyNguoiDung/ThemNguoiDung",
        method: "POST",
        data: user,
      });

      swal({
        title: "Successful",
        text: "User information added successful",
        icon: "success",
      });
      return res;
    } catch (err) {
      swal({
        title: "Failed",
        text: err.response.data,
        icon: "error",
      });
      //   return rejectWithValue(err.response.data);
    }
  },
  {
    condition: (__, { getState }) => {
      const { users } = getState();
      return users.status !== HTTP_STATUS.PENDING;
    },
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (user, { rejectWithValue }) => {
    try {
      const res = await api.request({
        url: "/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        method: "PUT",
        data: user,
      });

      swal({
        title: "Successful",
        text: "User information updated successful",
        icon: "success",
      });
      return res;
    } catch (err) {
      swal({
        title: "Failed",
        text: err.response.data,
        icon: "error",
      });
      //   return rejectWithValue(err.response.data);
    }
  },
  {
    condition: (__, { getState }) => {
      const { users } = getState();
      return users.status !== HTTP_STATUS.PENDING;
    },
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (username, { rejectWithValue }) => {
    try {
      const res = await api.request({
        url: "/api/QuanLyNguoiDung/XoaNguoiDung",
        method: "DELETE",
        params: {
          TaiKhoan: username,
        },
      });

      swal({
        title: "Successful",
        text: "Delete user successful",
        icon: "success",
      });
      return res;
    } catch (err) {
      swal({
        title: "Failed",
        text: err.response.data,
        icon: "error",
      });
      return rejectWithValue(err.response.data);
    }
  },
  {
    condition: (__, { getState }) => {
      const { users } = getState();
      return users.status !== HTTP_STATUS.PENDING;
    },
  }
);

export const findUserByUsername = createAsyncThunk(
  "users/findUserByUsername",
  async (searchTerm, { rejectWithValue }) => {
    try {
      const res = await api.request({
        url: "/api/QuanLyNguoiDung/TimKiemNguoiDung",
        method: "GET",
        params: {
          MaNhom: "GP02",
          tuKhoa: searchTerm,
        },
      });
      return res.data.map((user, index) => ({ ...user, id: index + 1 }));
    } catch (err) {
      return rejectWithValue(err.response.data);
      // console.log(err);
    }
  },
  {
    condition: (__, { getState }) => {
      const { users } = getState();
      return users.status !== HTTP_STATUS.PENDING;
    },
  }
);

export const getUserList = createAsyncThunk(
  "users/getUserList",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.request({
        url: "/api/QuanLyNguoiDung/LayDanhSachNguoiDung",
        method: "GET",
      });
      return res.data.map((user, index) => ({ ...user, id: index + 1 }));
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
  {
    condition: (__, { getState }) => {
      const { users } = getState();
      return users.status !== HTTP_STATUS.PENDING;
    },
  }
);

const initialState = {
  data: [],
  status: HTTP_STATUS.IDLE,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = HTTP_STATUS.IDLE;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addUser.pending, (state) => {
        state.status = HTTP_STATUS.PENDING;
      })
      .addCase(addUser.fulfilled, (state) => {
        state.status = HTTP_STATUS.FULFILLED;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = HTTP_STATUS.REJECTED;
        state.error = action.payload;
      })

      .addCase(updateUser.pending, (state) => {
        state.status = HTTP_STATUS.PENDING;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.status = HTTP_STATUS.FULFILLED;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = HTTP_STATUS.REJECTED;
        state.error = action.payload;
      })

      .addCase(deleteUser.pending, (state) => {
        state.status = HTTP_STATUS.PENDING;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.status = HTTP_STATUS.FULFILLED;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = HTTP_STATUS.REJECTED;
        state.error = action.payload;
      })

      .addCase(findUserByUsername.pending, (state) => {
        state.status = HTTP_STATUS.PENDING;
      })
      .addCase(findUserByUsername.fulfilled, (state, action) => {
        state.status = HTTP_STATUS.FULFILLED;
        state.data = action.payload;
      })
      .addCase(findUserByUsername.rejected, (state, action) => {
        state.status = HTTP_STATUS.REJECTED;
        state.error = action.payload;
      })

      .addCase(getUserList.pending, (state) => {
        state.status = HTTP_STATUS.PENDING;
      })
      .addCase(getUserList.fulfilled, (state, action) => {
        state.status = HTTP_STATUS.FULFILLED;
        state.data = action.payload;
      })
      .addCase(getUserList.rejected, (state, action) => {
        state.status = HTTP_STATUS.REJECTED;
        state.error = action.payload;
      });
  },
});

export const selectUsers = (state) => state.users.data;
export const usersStatus = (state) => state.users.status;
export const usersError = (state) => state.users.error;

export const { resetStatus } = usersSlice.actions;

export default usersSlice.reducer;
