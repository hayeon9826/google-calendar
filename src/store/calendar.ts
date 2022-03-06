import { createSlice } from "@reduxjs/toolkit";
import { getMonthDates, getWeekDates } from "../utils/date";
import moment from "moment";
import "moment/locale/ko";
import { timeProps } from "../interface";
moment.locale("ko");

const initialState = {
  date: moment().format("YYYY-MM-DD"),
  days: getMonthDates(
    moment(moment().format("YYYY-MM-DD")).startOf("month").format("YYYY-MM-DD"),
    moment(moment().format("YYYY-MM-DD")).endOf("month").format("YYYY-MM-DD")
  ),
  month: moment().format("MM"),
  weekDates: getWeekDates(moment().format("YYYY-MM-DD")),
  startTime: {
    text: moment().format("LT"),
    hour: moment().hour(),
    minute: moment().minute(),
  } as timeProps,
  endTime: {
    text: moment().add(1, "hour").format("LT"),
    hour: moment().add(1, "hour").hour(),
    minute: moment().add(1, "hour").minute(),
  } as timeProps,
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setDate: (state, action) => {
      const selectDate = moment(action.payload).format("YYYY-MM-DD");
      state.date = selectDate;
      state.month = moment(selectDate).format("MM");
      state.days = getMonthDates(
        moment(selectDate).startOf("month").format("YYYY-MM-DD"),
        moment(selectDate).endOf("month").format("YYYY-MM-DD")
      );
      state.weekDates = getWeekDates(selectDate);
    },
    setStartTime: (state, action) => {
      state.startTime = {
        text: moment(action.payload).format("LT"),
        hour: moment(action.payload).hour(),
        minute: moment(action.payload).minute(),
      };
    },
    setEndTime: (state, action) => {
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
