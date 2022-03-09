import { useSelector, useDispatch } from "react-redux";
import { setModalState } from "../store/modal";
import React, { useState } from "react";
import SideCalendar from "../components/SideCalendar";
import { RadioGroup } from "@headlessui/react";
import { weekDays, dayMinutes } from "../utils/date";
import { RootState } from "../store";
import { setStartTime, setEndTime } from "../store/calendar";
import { addEvent } from "../store/event";
import moment from "moment";
import toast from "react-simple-toasts";
import "moment/locale/ko";
import { minuteProps, modalProps } from "../interface";
import { classNames } from "../utils/index";
moment.locale("ko");

const Modal = ({ isShow = false }: modalProps) => {
  // color palette
  const colors = [
    { name: "blue", bgColor: "bg-blue-300", selectedColor: "ring-blue-300" },
    { name: "red", bgColor: "bg-red-300", selectedColor: "ring-red-300" },
    {
      name: "purple",
      bgColor: "bg-purple-300",
      selectedColor: "ring-purple-300",
    },

    { name: "green", bgColor: "bg-green-300", selectedColor: "ring-green-300" },
    {
      name: "yellow",
      bgColor: "bg-yellow-300",
      selectedColor: "ring-yellow-300",
    },
  ];

  // 모달 내부 속성 (날짜, 시간, 제목) state
  const [showDate, setShowDate] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [showStartTime, setShowStartTime] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const selectedDate = useSelector((state: RootState) => state.calendar.date);
  const selectedStartTime = useSelector(
    (state: RootState) => state.calendar.startTime
  );
  const selectedEndTime = useSelector(
    (state: RootState) => state.calendar.endTime
  );

  // 모달 생성 시 submit handler
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const event = {
      date: selectedDate,
      data: {
        title: title || "(제목 없음)",
        color: selectedColor.name,
        startAt: {
          hour: selectedStartTime.hour,
          minute: selectedStartTime.minute,
          text: selectedStartTime.text,
        },
        endAt: {
          hour: selectedEndTime.hour,
          minute: selectedEndTime.minute,
          text: selectedEndTime.text,
        },
        height: moment
          .duration(
            moment({ h: selectedEndTime.hour, m: selectedEndTime.minute }).diff(
              moment({ h: selectedStartTime.hour, m: selectedStartTime.minute })
            )
          )
          .asMinutes(),
      },
    };
    await dispatch(addEvent(event));
    setTitle("");
    dispatch(setStartTime(null));
    dispatch(setEndTime(null));
    dispatch(setModalState(false));
    toast("일정이 저장되었습니다.");
  };

  // utils/date.ts에 정의해둔 하루 시간 가져오기 (15분 간격)
  const minutes = dayMinutes();
  moment.locale();

  return (
    <div
      className={`${
        !isShow && "hidden"
      } overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-0 z-50 justify-center items-center md:inset-0 h-modal sm:h-full h-screen`}
      id="medium-modal"
    >
      <div className="relative px-4 w-full max-w-lg md:h-auto mx-auto mt-48">
        <div className="relative bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="flex justify-between items-center p-2 rounded-t ">
            <button
              type="button"
              onClick={() => {
                dispatch(setModalState(false));
                setShowDate(false);
                setShowEndTime(false);
                setShowStartTime(false);
                setSelectedColor(colors[0]);
                setTitle("");
              }}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
              data-modal-toggle="medium-modal"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <form className="p-6" onSubmit={submitHandler}>
            <div>
              <div className="mt-1 border-b-2 ">
                <input
                  type="text"
                  name="name"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onClick={() => setShowDate(false)}
                  id="name"
                  className="block w-full border-0 border-transparent text-2xl  border-blue-600 focus:outline-none focus:border-b-2 focus:animate-pulse"
                  placeholder="제목 추가"
                />
              </div>
            </div>
            <div className="grid grid-cols-11 mt-4">
              <input
                type="text"
                name="date"
                onClick={() => {
                  setShowDate(!showDate);
                  setShowStartTime(false);
                  setShowEndTime(false);
                }}
                id="date"
                className="placeholder-gray-600 block w-full border-0 border-transparent text-sm   border-blue-600 focus:outline-none focus:border-b-2 z-60 col-span-4 focus:animate-pulse"
                placeholder={
                  moment(selectedDate).format("M월 DD일") +
                  ` (${weekDays[moment(selectedDate).day()]}요일)`
                }
              />
              <input
                type="text"
                name="startTime"
                id="startTime"
                onClick={() => {
                  setShowDate(false);
                  setShowStartTime(!showStartTime);
                  setShowEndTime(false);
                }}
                className="placeholder-gray-600 block w-full border-0 border-transparent text-sm  border-blue-600 focus:outline-none focus:border-b-2 col-span-3 focus:animate-pulse"
                placeholder={selectedStartTime.text}
              />
              <div className="text-center">-</div>
              <input
                type="text"
                name="endTime"
                id="endTime"
                onClick={() => {
                  setShowDate(false);
                  setShowEndTime(!showEndTime);
                  setShowStartTime(false);
                }}
                className="placeholder-gray-600 block w-full border-0 border-transparent text-sm  border-blue-600 focus:outline-none focus:border-b-2 col-span-3 focus:animate-pulse"
                placeholder={selectedEndTime.text}
              />
            </div>

            <div className="grid grid-cols-10 mt-2">
              {showDate && <SideCalendar className={"shadow-lg col-span-7"} />}
              {showStartTime && (
                <div className="overflow-y-auto h-64 w-44 shadow-lg col-start-4">
                  <ul className="divide-y divide-gray-200">
                    {minutes.map((minute: minuteProps) => (
                      <li
                        key={`startTime-${minute.text}`}
                        className="py-4 flex hover:bg-gray-100"
                        onClick={() => {
                          dispatch(
                            setStartTime(
                              moment()
                                .set({
                                  hour: minute.hour,
                                  minute: minute.minute,
                                })
                                .toDate()
                                .toISOString()
                            )
                          );
                          setShowStartTime(false);
                        }}
                      >
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            {minute.text}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {showEndTime && (
                <div className="overflow-y-auto h-64 w-44 shadow-lg col-start-7">
                  <ul className="divide-y divide-gray-200">
                    {minutes.map((minute: minuteProps) => (
                      <span key={`startTime-${minute.text}`}>
                        {moment({
                          h: selectedStartTime.hour,
                          s: selectedStartTime.minute,
                        }).isBefore(
                          moment({
                            h: minute.hour,
                            s: minute.minute,
                          })
                        ) && (
                          <li
                            className="py-4 flex hover:bg-gray-100"
                            onClick={() => {
                              dispatch(
                                setEndTime(
                                  moment()
                                    .set({
                                      hour: minute.hour,
                                      minute: minute.minute,
                                    })
                                    .toDate()
                                    .toISOString()
                                )
                              );
                              setShowEndTime(false);
                            }}
                          >
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">
                                {minute.text}
                              </p>
                            </div>
                          </li>
                        )}
                      </span>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="mt-2">
              <RadioGroup value={selectedColor} onChange={setSelectedColor}>
                <RadioGroup.Label className="block text-sm font-medium text-gray-400">
                  색상 선택
                </RadioGroup.Label>
                <div className="mt-4 flex items-center space-x-3">
                  {colors.map((color, index) => (
                    <RadioGroup.Option
                      key={color.name}
                      value={color}
                      onClick={() => setSelectedColor(colors[index])}
                      className={({ active, checked }) =>
                        classNames(
                          color.selectedColor,
                          selectedColor.name === color.name
                            ? "ring ring-offset-1"
                            : "",
                          !active && checked ? "ring-2" : "",
                          "-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none"
                        )
                      }
                    >
                      <RadioGroup.Label as="p" className="sr-only">
                        {color.name}
                      </RadioGroup.Label>
                      <span
                        aria-hidden="true"
                        className={classNames(
                          color.bgColor,
                          "h-8 w-8 border border-black border-opacity-10 rounded-full"
                        )}
                      />
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center py-6 space-x-2 rounded-b flex-row-reverse">
              <button
                data-modal-toggle="medium-modal"
                type="submit"
                className="text-white ml-2 bg-blue-700 hover:bg-blue-800   font-medium rounded-md text-sm px-5 py-2.5 text-center"
              >
                저장
              </button>
              <button
                data-modal-toggle="medium-modal"
                type="button"
                onClick={() => {
                  dispatch(setModalState(false));
                  setShowDate(false);
                  setShowEndTime(false);
                  setShowStartTime(false);
                  setTitle("");
                  setSelectedColor(colors[0]);
                }}
                className="text-gray-700 bg-white hover:bg-gray-100 rounded-md text-sm font-medium px-5 py-2.5   "
              >
                취소
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
