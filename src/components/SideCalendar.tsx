import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import moment from "moment";
import { weekDays } from "../utils/date";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setDate, setStartTime, setEndTime } from "../store/calendar";
import { setModalState } from "../store/modal";
import { sideCalendarProps } from "../interface";
import { BsPlusLg } from "react-icons/bs";
import { classNames } from "../utils/index";

const SideCalendar = ({
  isMain = false,
  className = "",
}: sideCalendarProps) => {
  const selectedDate = useSelector((state: RootState) => state.calendar.date);
  const days = useSelector((state: RootState) => state.calendar.days);
  const month = useSelector((state: RootState) => state.calendar.month);

  const dispatch = useDispatch();

  return (
    <>
      {isMain && (
        <button
          type="button"
          onClick={() => {
            dispatch(setModalState(true));
            dispatch(setStartTime(moment().toDate().toISOString()));
            dispatch(
              setEndTime(moment().add(1, "hours").toDate().toISOString())
            );
          }}
          data-modal-toggle="medium-modal"
          className="inline-flex items-center ml-4 mt-2 px-3 py-2 lg:px-9 lg:py-3 md:px-9 md:py-3 border border-gray-200 shadow-lg text-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
        >
          <BsPlusLg className="text-lg text-blue-600 font-bold" />
          <span className="ml-2 text-sm">만들기</span>
        </button>
      )}

      <div className={`md:p-4 lg:p-6 mt-2 ${className}`}>
        <div className="flex items-center">
          <h2 className="ml-2 flex-auto font-semibold text-sm text-gray-600">
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
            <ChevronLeftIcon
              className="h-5 w-5 text-gray-600 hover:bg-gray-100 rounded-full"
              aria-hidden="true"
            />
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
            className="-my-1.5 -mr-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Next month</span>
            <ChevronRightIcon
              className="h-5 w-5 text-gray-600 hover:bg-gray-100 rounded-full"
              aria-hidden="true"
            />
          </button>
        </div>
        <div className="mt-4 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
          {weekDays.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-7">
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
                    "text-[10px]",
                    "hover:bg-gray-200",
                    "mx-auto flex h-4 w-4 items-center justify-center rounded-full"
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
