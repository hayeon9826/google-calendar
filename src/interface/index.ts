import { Dispatch, SetStateAction } from "react";

export interface daysType {
  date: string;
  day: string;
  isToday: boolean;
  isSelected: boolean;
  isThisWeek: boolean;
  isThisMonth: boolean;
}

export interface modalType {
  showModal?: boolean;
  date?: string;
  id?: number | null;
}

export interface calendarType {
  date: string;
  days: string[];
  month: string;
  weekDates: string[];
  startTime: timeProps;
  endTime: timeProps;
}

export interface removeModalProps {
  date: string;
  id: number;
}

export interface currentDate {
  date: string;
  days: string[];
  month: string;
  weekDays: string[];
}

export interface modalProps {
  isShow?: boolean;
}

export interface timeProps {
  text?: string;
  hour?: number;
  minute?: number;
}

export interface headerProps {
  sideOpen: boolean;
  weekView: boolean;
  setSideOpen: Dispatch<SetStateAction<boolean>>;
  setWeekView: Dispatch<SetStateAction<boolean>>;
}

export interface minuteProps {
  text?: string;
  hour?: number;
  minute?: number;
}

export interface eventType {
  title?: string;
  startAt: { hour: number; minute: number; text: string };
  endAt: { hour: number; minute: number; text: string };
  height: number;
  color: string;
}

export interface hourProps {
  text?: string;
  hour?: number;
}
export interface minuteProps {
  text?: string;
  hour?: number;
  minute?: number;
}

export interface sideCalendarProps {
  isMain?: boolean;
  className?: string;
}

export interface showModalProps {
  date?: string;
  id?: number | null;
}
