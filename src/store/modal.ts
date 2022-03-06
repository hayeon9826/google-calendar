import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { modalType, showModalProps } from "../interface";

const initialState: modalType = {
  showModal: false,
  date: "",
  id: null,
};

export const modalSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    // 빈 모달 생성
    setModalState: (state, action: PayloadAction<boolean>) => {
      state.showModal = action.payload;
    },
    // 상세 페이지 모달 정보 저장
    setOpenModal: (state, action: PayloadAction<showModalProps>) => {
      state.date = action.payload.date;
      state.id = action.payload.id;
    },
  },
});

export const { setModalState, setOpenModal } = modalSlice.actions;

export default modalSlice.reducer;
