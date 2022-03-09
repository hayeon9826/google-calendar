import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setDate, setStartTime, setEndTime } from "../store/calendar";
import React from "react";
import { weekDays } from "../utils/date";
import moment from "moment";
import { VscCircleFilled } from "react-icons/vsc";
import { setModalState, setOpenModal } from "../store/modal";
import { classNames } from "../utils/index";

const MonthCalendar = () => {
  const selectedDate = useSelector((state: RootState) => state.calendar.date);
  const days = useSelector((state: RootState) => state.calendar.days);
  const month = useSelector((state: RootState) => state.calendar.month);
  const weekEvents = useSelector((state: RootState) => state.event);

  const dispatch = useDispatch();

  return (
    <div className="lg:flex lg:h-full lg:flex-col col-span-5">
      <div className="shadow-lg mt-3 ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
        <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
          {weekDays.map((day) => (
            <div key={day} className="bg-white py-2">
              {day}
            </div>
          ))}
        </div>
        {/* web 페이지 */}
        <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto lg:h-screen md:h-screen overflow-scroll">
          <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
            {days &&
              days.map((day) => (
                <div
                  key={day}
                  onClick={() => {
                    dispatch(setDate(moment(day).format("YYYY-MM-DD")));
                    dispatch(setModalState(true));
                    dispatch(setStartTime(moment().toDate().toISOString()));
                    dispatch(
                      setEndTime(
                        moment().add(1, "hours").toDate().toISOString()
                      )
                    );
                  }}
                  className={classNames(
                    moment(day).format("MM") === month
                      ? "bg-white"
                      : "bg-gray-50 text-gray-500",
                    "relative py-2 px-3"
                  )}
                >
                  <time
                    className={
                      day === selectedDate
                        ? "flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white"
                        : undefined
                    }
                  >
                    {moment(day).format("D")}
                  </time>
                  {weekEvents[day] && (
                    <>
                      <ul className="-my-5  mt-2">
                        {weekEvents[day]?.map((eventMemo, index) => (
                          <li
                            key={`${day}-${index}`}
                            className="py-1"
                            onClick={() =>
                              dispatch(
                                setOpenModal({
                                  date: day,
                                  id: index,
                                })
                              )
                            }
                          >
                            <div className="relative">
                              <div className="text-sm font-normal w-full text-gray-800 hover:bg-gray-100 p-1 rounded-md">
                                <a href="#!" className="flex">
                                  <VscCircleFilled
                                    style={{
                                      color: `${eventMemo?.color}` || "blue",
                                    }}
                                    className={`${
                                      eventMemo?.color
                                        ? `text-${eventMemo?.color}-300 hover:text-${eventMemo?.color}-400`
                                        : "text-blue-300 hover:text-blue-400 mr-2"
                                    }`}
                                  />{" "}
                                  <span>
                                    {eventMemo?.startAt?.text}{" "}
                                    {eventMemo?.title}
                                  </span>
                                </a>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              ))}
          </div>
          {/* mobile 페이지 */}
          <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => {
                  dispatch(setDate(moment(day).format("YYYY-MM-DD")));
                  dispatch(setModalState(true));
                  dispatch(setStartTime(moment().toDate().toISOString()));
                  dispatch(
                    setEndTime(moment().add(1, "hours").toDate().toISOString())
                  );
                }}
                type="button"
                className={classNames(
                  moment(day).format("MM") === month
                    ? "bg-white"
                    : "bg-gray-50",
                  day === selectedDate && "font-semibold",
                  day === selectedDate && "text-white",
                  !(day === selectedDate) &&
                    moment(day).format("MM") === month &&
                    "text-gray-900",
                  !(day === selectedDate) &&
                    moment(day).format("MM") !== month &&
                    "text-gray-500",
                  "flex h-20 flex-col py-2 px-3 hover:bg-gray-100 focus:z-10"
                )}
              >
                <time
                  dateTime={day}
                  className={classNames(
                    day === selectedDate &&
                      "flex h-6 w-6 items-center justify-center rounded-full",
                    day === selectedDate && "bg-gray-900",
                    "ml-auto"
                  )}
                >
                  {moment(day).format("D")}
                </time>
                {weekEvents[day] && (
                  <div className="grid grid-cols-2 mx-auto">
                    {weekEvents[day]?.map((eventMemo, index) => (
                      <React.Fragment key={`${day}-${index}`}>
                        {/* 모바일은 최대 4개만 띄우기 */}
                        {index < 4 && (
                          <div
                            onClick={() =>
                              dispatch(
                                setOpenModal({
                                  date: day,
                                  id: index,
                                })
                              )
                            }
                          >
                            <div className="relative focus-within:ring-2">
                              <div className="text-sm font-normal w-full text-gray-800 hover:bg-gray-100 rounded-md">
                                <a href="#!" className="flex">
                                  <VscCircleFilled
                                    style={{
                                      color: eventMemo?.color || "blue",
                                    }}
                                    className={`${
                                      eventMemo?.color
                                        ? `text-${eventMemo?.color}-300 hover:text-${eventMemo?.color}-400`
                                        : "text-blue-300 hover:text-blue-400 "
                                    } text-xl`}
                                  />{" "}
                                </a>
                              </div>
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MonthCalendar;
