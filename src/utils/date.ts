import moment from "moment";

export const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

export const getMonthDates = (startDate: string, endDate: string) => {
  let prevDate = getPrevDaysInMonth(startDate);
  let dates = getDaysInMonth(startDate);
  let nextDate = getNextDaysInMonth(endDate);

  return prevDate.concat(dates).concat(nextDate);
};

export const getWeekDates = (date: string) => {
  let weekStart = moment(date).startOf("week").format("YYYY-MM-DD");
  let arrDays = [];

  for (let i = 0; i < 7; i++) {
    let current = moment(weekStart).add(i, "day");
    console.log(current.format("YYYY-MM-DD"));
    arrDays.push(current.format("YYYY-MM-DD"));
  }

  return arrDays;
};

export const getDaysInMonth = function (startDate: string) {
  let monthDate = moment(startDate).format("YYYY-MM-DD");
  let daysInMonth = moment(startDate).daysInMonth();
  let arrDays = [];
  let i = 0;

  while (daysInMonth) {
    let current = moment(monthDate).add(i, "day");
    arrDays.push(current.format("YYYY-MM-DD"));
    daysInMonth--;
    i++;
  }

  return arrDays;
};

export const getPrevDaysInMonth = function (startDate: string) {
  let lastMonthCount = moment(startDate).days();
  let arrDays = [];

  while (lastMonthCount) {
    let current = moment(startDate).subtract(lastMonthCount, "day");
    arrDays.push(current.format("YYYY-MM-DD"));
    lastMonthCount--;
  }

  return arrDays;
};

export const getNextDaysInMonth = function (endDate: string) {
  let nextMonthCount = 6 - moment(endDate).days();
  let arrDays = [];

  while (nextMonthCount) {
    let current = moment(endDate).add(nextMonthCount, "day");
    arrDays.push(current.format("YYYY-MM-DD"));
    nextMonthCount--;
  }

  return arrDays.reverse();
};
