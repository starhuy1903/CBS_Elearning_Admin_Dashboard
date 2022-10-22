import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";
import { HTTP_STATUS } from "../api/httpStatusConstants";

export const login = createAsyncThunk(
  "auth/login",
  async (user, { rejectWithValue }) => {
    try {
      const res = await api.request({
        url: "/api/QuanLyNguoiDung/DangNhap",
        method: "POST",
        data: user,
      });

      const profile = { ...res.data };
      delete profile.accessToken;

      localStorage.setItem("token", res.data.accessToken);
      return profile;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchProfile = createAsyncThunk("auth/fetchProfile", async () => {
  try {
    const res = await api.request({
      url: "/api/QuanLyNguoiDung/ThongTinNguoiDung",
      method: "POST",
    });

    return res.data;
  } catch (err) {
    console.log(err);
    console.log(err.response.data);
  }
});

const initialState = {
  data: null,
  status: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.status = HTTP_STATUS.PENDING;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = HTTP_STATUS.FULFILLED;
        state.data = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = HTTP_STATUS.REJECTED;
        state.error = action.payload;
      })
      // .addCase(fetchProfile.pending, (state) => {
      //   state.status = HTTP_STATUS.PENDING;
      // })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        // state.status = HTTP_STATUS.FULFILLED;
        state.data = action.payload;
      });
    // .addCase(fetchProfile.rejected, (state, action) => {
    //   state.status = HTTP_STATUS.REJECTED;
    //   state.error = action.payload;
    // })
  },
});

export const selectProfile = (state) => state.auth.data;
export const getAuthStatus = (state) => state.auth.status;
export const getAuthError = (state) => state.auth.error;

export default authSlice.reducer;
