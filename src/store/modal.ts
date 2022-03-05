import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
};

export const modalSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setModalState: (state, action) => {
      state.showModal = action.payload;
    },
  },
});

export const { setModalState } = modalSlice.actions;

export default modalSlice.reducer;
