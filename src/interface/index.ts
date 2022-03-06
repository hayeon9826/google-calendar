import { Dispatch, SetStateAction } from "react";

export interface daysType {
  date: string;
  day: string;
  isToday: boolean;
  isSelected: boolean;
  isThisWeek: boolean;
  isThisMonth: boolean;
}

export interface currentDate {
  date: string;
  days: string[];
  month: string;
  weekDays: string[];
}

export interface timeProps {
  text?: string;
  hour?: number;
  minute?: number;
}

export interface HeaderProps {
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

export interface EventType {
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

export interface SideCalendarProps {
  isMain?: boolean;
  className?: string;
}

export interface showModalProps {
  date?: string;
  id?: string | null;
}
