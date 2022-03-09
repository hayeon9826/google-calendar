import { useRef } from "react";
import { setDate, setStartTime, setEndTime } from "../store/calendar";
import { weekDays, dayHours } from "../utils/date";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import moment from "moment";
import { setModalState, setOpenModal } from "../store/modal";
import { eventType, hourProps } from "../interface";

const WeekCalendar = () => {
  const container = useRef<any>(null);
  const containerNav = useRef<any>(null);
  const containerOffset = useRef<any>(null);

  const selectedDate = useSelector((state: RootState) => state.calendar.date);
  const weekDates = useSelector((state: RootState) => state.calendar.weekDates);
  const dailyHours = dayHours();
  const weekEvents = useSelector((state: RootState) => state.event);

  const dispatch = useDispatch();

  return (
    <div className="flex flex-col col-span-5">
      <div ref={container} className="flex flex-auto flex-col bg-white">
        <div
          style={{ width: "165%" }}
          className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full"
        >
          <div
            ref={containerNav}
            className=" top-0 z-10 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 "
          >
            {/* 모바일 버전 */}
            <div className="grid grid-cols-7 text-sm leading-6 text-gray-500 sm:hidden">
              <div className="col-end-1 w-14 " />
              {/* date.ts에서 이번주 날짜 가져옴 */}
              {weekDates &&
                weekDates.map((date, index) => (
                  <button
                    onClick={() =>
                      dispatch(setDate(moment(date).format("YYYY-MM-DD")))
                    }
                    key={`week-${date}`}
                    type="button"
                    className="flex flex-col items-center pt-2 pb-3 cursor-pointer hover:bg-gray-100 rounded-full"
                  >
                    <div className="text-xs text-gray-500">
                      {weekDays[index]}
                    </div>{" "}
                    <div
                      className={
                        selectedDate === date
                          ? "mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 font-semibold text-white text-lg"
                          : "mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-500 text-lg"
                      }
                    >
                      {moment(date).format("DD")}
                    </div>
                  </button>
                ))}
            </div>
            {/* pc 버전 */}
            <div className="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid">
              <div className="col-end-1 w-14" />
              {/* date.ts에서 이번주 날짜 가져옴 */}
              {weekDates &&
                weekDates.map((date, index) => (
                  <div
                    onClick={() =>
                      dispatch(setDate(moment(date).format("YYYY-MM-DD")))
                    }
                    className="flex items-center justify-center py-3 "
                    key={`week-${index}`}
                  >
                    <span>
                      <div className="text-center text-xs text-gray-500">
                        {weekDays[index]}
                      </div>
                      <div
                        className={
                          selectedDate === date
                            ? "flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-semibold text-white text-xl"
                            : "flex items-center justify-center font-semibold text-gray-500 text-xl cursor-pointer hover:bg-gray-100 rounded-full h-12 w-12 "
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
            <div className="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100  " />
            <div className="grid flex-auto grid-cols-1 grid-rows-1">
              {/* Horizontal lines */}
              <div
                className="col-start-1 col-end-2 row-start-1 grid "
                style={{
                  gridTemplateRows: "repeat(24, minmax(3.5rem, 1fr))",
                }}
              >
                <div ref={containerOffset} className="row-end-1 h-7"></div>
                {/* date.js에서 하루 24시간 가져옴 */}
                {dailyHours &&
                  dailyHours.map((hour: hourProps) => (
                    <div key={hour.text}>
                      <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-[10px] leading-5 text-gray-500 h-14">
                        {hour.text + "시"}
                      </div>
                    </div>
                  ))}
              </div>

              <div className="col-start-1 col-end-2 row-start-1 grid grid-cols-7 grid-rows-1">
                {/* row는 이번주 날짜, col은 24시간으로 7*24 그리드 생성 */}
                {weekDates &&
                  weekDates.map((week) => (
                    <div key={week}>
                      {/* date.ts에서 24 시간 가져옴 */}
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
                              } h-14 text-xs text-gray-500 border-gray-200 border-l border-t relative cursor-pointer hover:bg-gray-50`}
                            >
                              {/* 등록한 일정 보이기 */}
                              {weekEvents[week] &&
                                weekEvents[week]?.map(
                                  (eventMemo: eventType, index: number) =>
                                    dailyHour.hour ===
                                    eventMemo.startAt?.hour ? (
                                      <div
                                        key={`evenet-${index}`}
                                        onClick={() =>
                                          dispatch(
                                            setOpenModal({
                                              date: week,
                                              id: index,
                                            })
                                          )
                                        }
                                        className={`${
                                          eventMemo?.color
                                            ? `bg-${eventMemo?.color}-300 hover:bg-${eventMemo?.color}-400`
                                            : "bg-blue-300 hover:bg-blue-400"
                                        } z-20 group absolute inset-1 flex flex-col overflow-y-auto rounded-md text-xs leading-5  text-white`}
                                        style={{
                                          // 시작 시간 위치 잡기
                                          top: eventMemo?.startAt?.minute
                                            ? `${
                                                (eventMemo?.startAt?.minute /
                                                  60) *
                                                100
                                              }%`
                                            : "0%",
                                          // 끝나는 시간 위치 잡기
                                          height: eventMemo?.height
                                            ? `${
                                                (eventMemo?.height / 60) * 100 >
                                                40
                                                  ? (eventMemo?.height / 60) *
                                                    100
                                                  : 40
                                              }%`
                                            : "120%",
                                          // 같은 날짜에 생성한 데이터는 겹칠 경우가 있으므로, 다르게 margin 주기
                                          marginLeft: `${index * 5}%`,
                                        }}
                                      >
                                        <div className="inline-block align-middle font-semibold pl-2">
                                          {eventMemo.title}
                                        </div>
                                        <div className="inline-block align-middle font-semibold pl-2">
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
