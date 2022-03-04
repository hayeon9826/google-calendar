import Header from "../components/Header";
import WeekCalendar from "../components/WeekCalendar";
import SideCalendar from "../components/SideCalendar";

const GoogleCalendar = () => {
  return (
    <>
      <Header />
      <div className="md:grid md:grid-cols-7">
        <SideCalendar />
        <WeekCalendar />
      </div>
    </>
  );
};

export default GoogleCalendar;
