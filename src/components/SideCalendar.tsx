import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import moment from "moment";
import { weekDays, getMonthDates } from "../utils/date";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setDate } from "../store/calendar";
import { setModalState } from "../store/modal";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const SideCalendar = () => {
  const selectedDate = useSelector((state: RootState) => state.calendar.date);
  const days = useSelector((state: RootState) => state.calendar.days);
  const month = useSelector((state: RootState) => state.calendar.month);

  const dispatch = useDispatch();

  return (
    <>
      <button
        type="button"
        onClick={() => dispatch(setModalState(true))}
        data-modal-toggle="medium-modal"
        className="inline-flex items-center ml-4 mt-2 px-8 py-2 border border-gray-300 shadow-lg text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
      >
        만들기
      </button>
      <div className="md:p-4 lg:p-6 mt-2">
        <div className="flex items-center">
          <h2 className="ml-2 flex-auto font-semibold text-gray-600">
            {moment(selectedDate).format("YYYY년 MM월")}
          </h2>
          <button
            type="button"
            onClick={() =>
              dispatch(
                setDate(
                  moment(selectedDate).subtract(1, "month").format("YYYY-MM-DD")
                )
              )
            }
            className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Previous month</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() =>
              dispatch(
                setDate(
                  moment(selectedDate).add(1, "month").format("YYYY-MM-DD")
                )
              )
            }
            className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Next month</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
          {weekDays.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-7 text-xs">
          {days &&
            days.map((day, index) => (
              <div key={index} className={classNames("py-2")}>
                <button
                  type="button"
                  onClick={() =>
                    dispatch(setDate(moment(day).format("YYYY-MM-DD")))
                  }
                  className={classNames(
                    "text-gray-600",
                    selectedDate === day && "bg-blue-200 text-blue-600",
                    "text-xs",
                    "hover:bg-gray-200",
                    "mx-auto flex h-6 w-6 items-center justify-center rounded-full"
                  )}
                >
                  {moment(day).format("MM") !== month ? (
                    <time className="text-gray-400">
                      {moment(day).format("D")}
                    </time>
                  ) : (
                    <time>{moment(day).format("D")}</time>
                  )}
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default SideCalendar;
