import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getMonthDates, getWeekDates } from "../utils/date";
import moment from "moment";
import "moment/locale/ko";
import { calendarType } from "../interface";
moment.locale("ko");

const initialState: calendarType = {
  date: moment().format("YYYY-MM-DD"),
  // 해당 월 날짜 세팅
  days: getMonthDates(
    moment(moment().format("YYYY-MM-DD")).startOf("month").format("YYYY-MM-DD"),
    moment(moment().format("YYYY-MM-DD")).endOf("month").format("YYYY-MM-DD")
  ),
  month: moment().format("MM"),
  // 해당 주 날짜 세팅
  weekDates: getWeekDates(moment().format("YYYY-MM-DD")),
  // (모달 생성 or 이벤트 상세 선택 시) 선택한 시작 시간
  startTime: {
    text: moment().format("LT"),
    hour: moment().hour(),
    minute: moment().minute(),
  },
  // (모달 생성시) 선택한 종료 시간
  endTime: {
    text: moment().add(1, "hour").format("LT"),
    hour: moment().add(1, "hour").hour(),
    minute: moment().add(1, "hour").minute(),
  },
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    // 현재 날짜 클릭시 작동
    setDate: (state, action: PayloadAction<string>) => {
      const selectDate = moment(action.payload).format("YYYY-MM-DD");
      state.date = selectDate;
      state.month = moment(selectDate).format("MM");
      state.days = getMonthDates(
        moment(selectDate).startOf("month").format("YYYY-MM-DD"),
        moment(selectDate).endOf("month").format("YYYY-MM-DD")
      );
      state.weekDates = getWeekDates(selectDate);
    },
    // 모달에서 시작 시간 클릭 시 작동
    setStartTime: (state, action: PayloadAction<string | null>) => {
      state.startTime = {
        text: moment(action.payload).format("LT"),
        hour: moment(action.payload).hour(),
        minute: moment(action.payload).minute(),
      };
      // 시작 시간 누르면 끝 시간은 자동으로 1시간 뒤로 설정
      state.endTime = {
        text: moment(action.payload).add(1, "hour").format("LT"),
        hour: moment(action.payload).add(1, "hour").hour(),
        minute: moment(action.payload).add(1, "hour").minute(),
      };
    },
    // 모달에서 끝 시간 클릭 시 작동
    setEndTime: (state, action: PayloadAction<string | null>) => {
      state.endTime = {
        text: moment(action.payload).format("LT"),
        hour: moment(action.payload).hour(),
        minute: moment(action.payload).minute(),
      };
    },
  },
});

export const { setDate, setStartTime, setEndTime } = calendarSlice.actions;

export default calendarSlice.reducer;
