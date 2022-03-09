import moment from "moment";
import { hourProps, minuteProps } from "../interface";

// 요일
export const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

// 하루 24시간 정의. {text: string, hour: number} 형태
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

// 하루 24시간에 '분' 추가. "00", "15", "30", "45"를 추가해서 총 24*4개의 시간
// 모달에서 시작시간, 종료시간 picker 에 사용
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

// (선택된 현재 날짜 기준) 해당 월 날짜들 가져오기.
// MonthCalendar, SideCalendar에 추가할 용도
export const getMonthDates = (startDate: string, endDate: string) => {
  let prevDate = getPrevDaysInMonth(startDate);
  let dates = getDaysInMonth(startDate);
  let nextDate = getNextDaysInMonth(endDate);
  return prevDate.concat(dates).concat(nextDate);
};

// 해당 월 날짜 리텅
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

// 만약 해당 1일이 일요일이 아닐 경우, 이전달에서 나머지 날짜들을 가져옴
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

// 만약 해당 마지막일이 토요일이 아닐 경우, 다음달에서 나머지 날짜들을 가져옴
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

// 선택한 날짜 기준 해당 주 날짜
// moment의 startOf("week") 메서드 사용
// 해당 시작일 기준으로 7일을 for문 돌려서 7일 간 날짜 생성
export const getWeekDates = (date: string) => {
  let weekStart = moment(date).startOf("week").format("YYYY-MM-DD");
  let arrDays = [];

  for (let i = 0; i < 7; i++) {
    let current = moment(weekStart).add(i, "day");
    arrDays.push(current.format("YYYY-MM-DD"));
  }
  return arrDays;
};
