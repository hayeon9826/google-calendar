import { useSelector, useDispatch } from "react-redux";
import { setOpenModal, setModalState } from "../store/modal";
import React from "react";
import { weekDays } from "../utils/date";
import { removeEvent } from "../store/event";
import { RootState } from "../store";
import moment from "moment";
import toast from "react-simple-toasts";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import { showModalProps } from "../interface";
import "moment/locale/ko";
moment.locale("ko");

const ShowModal = ({ date = "", id = null }: showModalProps) => {
  const dispatch = useDispatch();
  const weekEvents = useSelector((state: RootState) => state.event);

  moment.locale();

  return (
    <>
      {/* 선택된 날짜와 event의 id가 있어야 보여줌 */}
      {date && id !== null && weekEvents[date][id] && (
        <div
          className={`overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-0 z-50 justify-center items-center md:inset-0 h-modal sm:h-full h-screen`}
          id="medium-modal"
        >
          <div className="relative px-4 w-full max-w-lg h-full md:h-auto mx-auto mt-64">
            <div className="relative bg-white rounded-lg shadow-lg  border border-gray-200">
              <div className="grid grid-cols-10 p-2 rounded-t ">
                <button
                  type="button"
                  onClick={() => {
                    dispatch(removeEvent({ date: date, id: id }));
                    dispatch(setOpenModal({ date: "", id: null }));
                    dispatch(setModalState(false));
                    toast("일정이 삭제되었습니다.");
                  }}
                  className="col-start-9 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                  data-modal-toggle="medium-modal"
                >
                  <BiTrash className="text-base" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    dispatch(setOpenModal({ date: "", id: null }));
                    dispatch(setModalState(false));
                  }}
                  className="col-start-10  text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
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
              <div className="px-6 pb-6">
                <div className="grid grid-cols-10">
                  <div className="col-span-1 text-center mt-2 ml-2">
                    <MdOutlineCheckBoxOutlineBlank
                      style={{
                        color: `${weekEvents[date][id]?.color}` || "blue",
                        background: `${weekEvents[date][id]?.color}` || "blue",
                      }}
                    />
                  </div>

                  <h3 className="col-span-9 font-semibold text-xl">
                    {weekEvents[date][id]?.title}
                  </h3>
                  <div className="col-start-2 col-span-9 text-gray-600 text-sm mt-2">
                    {moment(date).format("M월 DD일")} (
                    {weekDays[moment(date).days()] + "요일"}){" ⋅ "}
                    {weekEvents[date][id]?.startAt?.text} ~{" "}
                    {weekEvents[date][id]?.endAt?.text}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowModal;
