import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
  date: "",
  id: null,
};

export const modalSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setModalState: (state, action) => {
      state.showModal = action.payload;
    },

    setOpenModal: (state, action) => {
      state.date = action.payload.date;
      state.id = action.payload.id;
    },
  },
});

export const { setModalState, setOpenModal } = modalSlice.actions;

export default modalSlice.reducer;
