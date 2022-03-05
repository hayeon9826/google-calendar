import { useSelector, useDispatch } from "react-redux";
import { setOpenModal, setModalState } from "../store/modal";
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
moment.locale("ko");

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

interface showModalProps {
  date?: string;
  id?: string | null;
}

const ShowModal = ({ date = "", id = "" }: showModalProps) => {
  const dispatch = useDispatch();
  const weekEvents = useSelector((state: RootState) => state.event);

  moment.locale();

  return (
    <>
      {date && id && weekEvents[date][parseInt(id)] && (
        <div
          className={`overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-0 z-50 justify-center items-center md:inset-0 h-modal sm:h-full`}
          id="medium-modal"
        >
          <div className="relative px-4 w-full max-w-lg h-full md:h-auto mx-auto mt-48">
            <div className="relative bg-white rounded-lg shadow-lg ">
              <div className="flex justify-between items-center p-2 rounded-t ">
                <button
                  type="button"
                  onClick={() => {
                    dispatch(setOpenModal({ date: "", id: "" }));
                    dispatch(setModalState(false));
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
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowModal;
