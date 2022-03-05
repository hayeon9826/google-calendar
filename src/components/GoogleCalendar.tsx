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
  const [sideOpen, setSideOpen] = useState(true);
  const [weekView, setWeekView] = useState(true);
  const showModal = useSelector((state: RootState) => state.modal.showModal);
  const openModal = useSelector((state: RootState) => state.modal);

  console.log(openModal);

  return (
    <>
      <Header
        sideOpen={sideOpen}
        setSideOpen={setSideOpen}
        weekView={weekView}
        setWeekView={setWeekView}
      />
      <div
        className={`md:grid ${sideOpen ? "md:grid-cols-7" : "md:grid-cols-6"} `}
      >
        <div className={sideOpen ? "block" : "hidden"}>
          <SideCalendar isMain={true} />
        </div>
        {weekView ? <WeekCalendar /> : <MonthCalendar />}
        <Modal isShow={showModal && !openModal?.date} />
        <ShowModal date={openModal?.date} id={openModal?.id} />
      </div>
    </>
  );
};

export default GoogleCalendar;
