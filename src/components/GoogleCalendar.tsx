import Header from "../components/Header";
import WeekCalendar from "../components/WeekCalendar";
import MonthCalendar from "../components/MonthCalendar";
import SideCalendar from "../components/SideCalendar";
import { useState } from "react";
import Modal from "./Modal";
import ShowModal from "./ShowModal";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const GoogleCalendar = () => {
  // 왼쪽 사이드 바 열고 닫는 state
  const [sideOpen, setSideOpen] = useState(true);
  // 주/월 달력 보기
  const [weekView, setWeekView] = useState(true);
  // 새 모달 열기 (boolean)
  const showModal = useSelector((state: RootState) => state.modal.showModal);
  // 기존 모달 열기 (date, id로 구분)
  const openModal = useSelector((state: RootState) => state.modal);

  return (
    <>
      <Header
        sideOpen={sideOpen}
        setSideOpen={setSideOpen}
        weekView={weekView}
        setWeekView={setWeekView}
      />
      <div
        className={`md:grid ${sideOpen ? "md:grid-cols-6" : "md:grid-cols-5"} `}
      >
        <div className={sideOpen ? "block" : "hidden"}>
          <SideCalendar isMain={true} />
        </div>
        {weekView ? <WeekCalendar /> : <MonthCalendar />}
        <Modal isShow={showModal && !openModal?.date} />
        <ShowModal date={openModal.date} id={openModal.id} />
      </div>
    </>
  );
};

export default GoogleCalendar;
