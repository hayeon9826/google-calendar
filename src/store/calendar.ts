import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { daysType } from "../interface";
import { getMonthDates, getWeekDates } from "../utils/date";
import moment from "moment";

export interface currentDate {
  date: string;
  days: string[];
  month: string;
  weekDays: string[];
}

const initialState = {
  date: moment().format("YYYY-MM-DD"),
  days: getMonthDates(
    moment(moment().format("YYYY-MM-DD")).startOf("month").format("YYYY-MM-DD"),
    moment(moment().format("YYYY-MM-DD")).endOf("month").format("YYYY-MM-DD")
  ),
  month: moment().format("MM"),
  weekDates: getWeekDates(moment().format("YYYY-MM-DD")),
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
  },
});

export const { setDate } = calendarSlice.actions;

export default calendarSlice.reducer;
