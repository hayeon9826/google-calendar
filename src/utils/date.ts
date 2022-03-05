import moment from "moment";

export const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

export const dayHours = () => {
  let hours: object[] = [];
  for (let i = 0; i < 24; i++) {
    if (i < 12) {
      hours.push({ text: `오전 ${i}`, hour: i });
    } else {
      hours.push({ text: `오후 ${i === 12 ? 12 : i - 12}`, hour: i });
    }
  }

  return hours;
};

interface hourProps {
  text?: string;
  hour?: number;
}
interface minuteProps {
  text?: string;
  hour?: number;
  minute?: number;
}

export const dayMinutes = () => {
  let hours: hourProps[] = dayHours();
  let minutes: minuteProps[] = [];
  const min = ["00", "15", "30", "45"];
  hours.forEach((hour) => {
    min.forEach((val) => {
      minutes.push({
        hour: hour.hour,
        minute: parseInt(val),
        text: hour.text + ":" + val,
      });
    });
  });

  return minutes;
};

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
