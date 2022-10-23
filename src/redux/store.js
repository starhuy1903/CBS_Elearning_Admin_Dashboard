import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import uiReducer from "./uiSlice";
import courseReducer from "./courseSlice";
import usersReducer from "./usersSlice";
import registerReducer from "./registerSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    course: courseReducer,
    users: usersReducer,
    register: registerReducer,
  },
});

export default store;
