import { useEffect, useRef } from "react";
import { setDate, setStartTime, setEndTime } from "../store/calendar";
import { weekDays, dayHours } from "../utils/date";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import moment from "moment";
import { setModalState, setOpenModal } from "../store/modal";

const WeekCalendar = () => {
  const container = useRef<any>(null);
  const containerNav = useRef<any>(null);
  const containerOffset = useRef<any>(null);

  const selectedDate = useSelector((state: RootState) => state.calendar.date);
  const weekDates = useSelector((state: RootState) => state.calendar.weekDates);
  const dailyHours = dayHours();
  const weekEvents = useSelector((state: RootState) => state.event);

  console.log(weekEvents);
  interface hourProps {
    text?: string;
    hour?: number;
  }

  interface eventProps {
    title?: string;
    startAt: { hour: number; minute: number; text: string };
    endAt: { hour: number; minute: number; text: string };
    height?: number;
    color?: string;
  }

  useEffect(() => {
    // Set the container scroll position based on the current time.
    const currentMinute = new Date().getHours() * 60;
    container.current.scrollTop =
      ((container.current.scrollHeight -
        containerNav.current.offsetHeight -
        containerOffset.current.offsetHeight) *
        currentMinute) /
      1440;
  }, []);

  const dispatch = useDispatch();

  return (
    <div className="flex flex-col col-span-6">
      <div ref={container} className="flex flex-auto flex-col bg-white">
        <div
          style={{ width: "165%" }}
          className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full"
        >
          <div
            ref={containerNav}
            className=" top-0 z-10 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 "
          >
            <div className="grid grid-cols-7 text-sm leading-6 text-gray-500 sm:hidden">
              <div className="col-end-1 w-14" />
              {weekDates &&
                weekDates.map((date, index) => (
                  <button
                    onClick={() =>
                      dispatch(setDate(moment(date).format("YYYY-MM-DD")))
                    }
                    key={`week-${date}`}
                    type="button"
                    className="flex flex-col items-center pt-2 pb-3"
                  >
                    <div className="text-xs text-gray-500">
                      {weekDays[index]}
                    </div>{" "}
                    <div
                      className={
                        selectedDate === date
                          ? "mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white text-lg"
                          : "mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-500 text-lg"
                      }
                    >
                      {moment(date).format("DD")}
                    </div>
                  </button>
                ))}
            </div>

            <div className="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid">
              <div className="col-end-1 w-14" />
              {weekDates &&
                weekDates.map((date, index) => (
                  <div
                    onClick={() =>
                      dispatch(setDate(moment(date).format("YYYY-MM-DD")))
                    }
                    className="flex items-center justify-center py-3"
                    key={`week-${index}`}
                  >
                    <span>
                      <div className="text-center text-xs text-gray-500">
                        {weekDays[index]}
                      </div>
                      <div
                        className={
                          selectedDate === date
                            ? "flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-semibold text-white text-2xl"
                            : "items-center justify-center font-semibold text-gray-500 text-2xl"
                        }
                      >
                        {moment(date).format("DD")}
                      </div>
                    </span>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex h-screen flex-auto overflow-scroll">
            <div className="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100" />
            <div className="grid flex-auto grid-cols-1 grid-rows-1">
              {/* Horizontal lines */}
              <div
                className="col-start-1 col-end-2 row-start-1 grid"
                style={{
                  gridTemplateRows: "repeat(24, minmax(3.5rem, 1fr))",
                }}
              >
                <div ref={containerOffset} className="row-end-1 h-7"></div>
                {dailyHours &&
                  dailyHours.map((hour: hourProps) => (
                    <div key={hour.text}>
                      <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-500 h-14">
                        {hour.text + "시"}
                      </div>
                    </div>
                  ))}
              </div>

              {/* Vertical lines */}
              <div className="col-start-1 col-end-2 row-start-1 grid-cols-7 grid-rows-1 sm:grid sm:grid-cols-7">
                {weekDates &&
                  weekDates.map((week) => (
                    <div key={week}>
                      {dailyHours &&
                        dailyHours.map(
                          (dailyHour: hourProps, index: number) => (
                            <div
                              key={`dailyhour-${index}`}
                              onClick={() => {
                                dispatch(setModalState(true));
                                dispatch(
                                  setDate(moment(week).format("YYYY-MM-DD"))
                                );
                                dispatch(
                                  setStartTime(
                                    moment()
                                      .set({
                                        hour: dailyHour.hour,
                                        minute: 0,
                                      })
                                      .toDate()
                                      .toISOString()
                                  )
                                );
                                dispatch(
                                  setEndTime(
                                    moment()
                                      .set({
                                        hour:
                                          dailyHour?.hour &&
                                          dailyHour?.hour + 1,
                                        minute: 0,
                                      })
                                      .toDate()
                                      .toISOString()
                                  )
                                );
                              }}
                              className={`col-start-${
                                index + 1
                              } h-14 text-center text-xs text-gray-500 border-gray-200 border-l border-t relative`}
                            >
                              {weekEvents[week] &&
                                weekEvents[week]?.map(
                                  (eventMemo: eventProps, index: number) =>
                                    dailyHour.hour ===
                                    eventMemo.startAt?.hour ? (
                                      <div
                                        key={`evenet-${index}`}
                                        onClick={() =>
                                          dispatch(
                                            setOpenModal({
                                              date: week,
                                              id: `${index}`,
                                            })
                                          )
                                        }
                                        className={`${
                                          eventMemo?.color
                                            ? `bg-${eventMemo?.color}-300 hover:bg-${eventMemo?.color}-400`
                                            : "bg-blue-300 hover:bg-blue-400 "
                                        } z-20 group absolute inset-1 flex flex-col overflow-y-auto rounded-lg  p-2 text-xs leading-5  text-white`}
                                        style={{
                                          height: eventMemo?.height
                                            ? `${
                                                (eventMemo?.height / 60) * 100 >
                                                40
                                                  ? (eventMemo?.height / 60) *
                                                    100
                                                  : 40
                                              }%`
                                            : "120%",
                                          left: `${index * 10}px`,
                                        }}
                                      >
                                        <div className="inline-block align-middle font-semibold">
                                          {eventMemo.title}
                                        </div>
                                        <div className="inline-block align-middle font-semibold">
                                          {eventMemo?.startAt?.text} ~{" "}
                                          {eventMemo?.endAt?.text}
                                        </div>
                                      </div>
                                    ) : (
                                      ""
                                    )
                                )}
                            </div>
                          )
                        )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WeekCalendar;
