import Header from "../components/Header";
import WeekCalendar from "../components/WeekCalendar";
import MonthCalendar from "../components/MonthCalendar";
import SideCalendar from "../components/SideCalendar";
import { useState } from "react";
import Modal from "./Modal";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const GoogleCalendar = () => {
  const [sideOpen, setSideOpen] = useState(true);
  const [weekView, setWeekView] = useState(true);
  const showModal = useSelector((state: RootState) => state.modal.showModal);

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
          <SideCalendar />
        </div>
        {weekView ? <WeekCalendar /> : <MonthCalendar />}
        <Modal isShow={showModal} />
      </div>
    </>
  );
};

export default GoogleCalendar;
