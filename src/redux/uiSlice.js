import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeMenu: true,
  screenSize: undefined,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setActiveMenu(state, action) {
      state.activeMenu = action.payload;
    },
    setScreenSize(state, action) {
      state.screenSize = action.payload;
    },
  },
});

export const selectActiveMenu = (state) => state.ui.activeMenu;
export const selectScreenSize = (state) => state.ui.screenSize;

export const { setActiveMenu, setScreenSize } = uiSlice.actions;

export default uiSlice.reducer;
