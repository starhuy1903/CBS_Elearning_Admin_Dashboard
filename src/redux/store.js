import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import uiReducer from "./uiSlice";
import courseReducer from "./courseSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    course: courseReducer,
  },
});

export default store;
