import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { eventType, removeModalProps } from "../interface";

const initialState: { [key: string]: Array<eventType> } = {
  "2022-03-05": [
    {
      title: "메모 입력해주세요.",
      startAt: { hour: 14, minute: 30, text: "오후 2:30" },
      endAt: { hour: 13, minute: 30, text: "오후 3:30" },
      // week calendar에서 height 미리 계산
      height: 100,
      color: "blue",
    },
  ],
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    addEvent: (state, action) => {
      // 해당 날짜에 메모가 없으면 빈 배열 생성
      if (!state[action.payload.date]) {
        state[action.payload.date] = [];
      }
      // 해당 날짜 배열에 dictionary 데이터 추가
      state[action.payload.date] = [
        ...state[action.payload.date],
        action.payload.data,
      ];
    },
    removeEvent: (state, action: PayloadAction<removeModalProps>) => {
      // 배열에서 해당 index값 제거
      state[action.payload.date].splice(action.payload.id, 1);
    },
  },
});

export const { addEvent, removeEvent } = eventSlice.actions;
export const events = (state: RootState) => state.event;
export default eventSlice.reducer;
