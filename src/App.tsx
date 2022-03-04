import "tailwindcss/tailwind.css";
import "./App.css";

import GoogleCalendar from "../src/components/GoogleCalendar";
interface dayProps {
  date: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
}

function App() {
  return (
    <>
      <GoogleCalendar />
    </>
  );
}

export default App;
