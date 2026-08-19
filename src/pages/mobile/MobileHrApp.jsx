import { useState } from "react";
import HeaderBar from "./components/HeaderBar";
import BottomNav from "./components/BottomNav";

import Home from "./screens/Home";
import RequestsCatalog from "./screens/RequestsCatalog";
import NewRequestForm from "./screens/NewRequestForm";
import MyRequests from "./screens/MyRequests";
import ManagerRequests from "./screens/ManagerRequests";
import Statistics from "./screens/Statistics";
import Networks from "./screens/Networks";
import Salary from "./screens/Salary";
import OrgChart from "./screens/OrgChart";
import DailyReport from "./screens/DailyReport";
import Announcements from "./screens/Announcements";
import VacationsHolidays from "./screens/VacationsHolidays";
import More from "./screens/More";
import Notifications from "./screens/Notifications";
import PlaceholderScreen from "./screens/PlaceholderScreen";

import { currentUser, todayShift } from "./mockData";

// Titles shown in the header for non-home screens.
const TITLES = {
  requests: "All Requests",
  newRequest: "New Request",
  myRequests: "My Requests",
  managerRequests: "Manager Requests",
  statistics: "Statistics",
  networks: "Networks",
  salary: "My Salary",
  orgChart: "Organization Chart",
  dailyReport: "Daily Report",
  announcements: "Announcements",
  vacationsHolidays: "Vacations & Holidays",
  more: "More",
  notifications: "Notifications",
  schedule: "My Schedule",
  companyPolicy: "Company Policy",
  departmentPolicy: "Department Policy",
};

// Screens reachable only via drill-down (not a bottom-tab root) — used to
// know when to show a back button instead of the greeting/avatar.
const SUB_SCREENS = new Set([
  "newRequest", "myRequests", "managerRequests", "networks", "orgChart",
  "dailyReport", "announcements", "vacationsHolidays", "notifications",
  "schedule", "companyPolicy", "departmentPolicy",
]);

const TAB_ROOT = { home: "home", statistics: "statistics", requests: "requests", more: "more" };

export default function MobileHrApp() {
  const [view, setView] = useState("home");
  const [history, setHistory] = useState([]);
  const [shift, setShift] = useState(todayShift);
  const [pendingType, setPendingType] = useState(null);
  const isManager = true; // demo flag — swap for real role check once wired to auth

  const navigate = (next) => {
    setHistory((h) => [...h, view]);
    setView(next);
  };

  const goBack = () => {
    setHistory((h) => {
      const prev = h[h.length - 1] ?? "home";
      setView(prev);
      return h.slice(0, -1);
    });
  };

  const onTabChange = (tab) => {
    setHistory([]);
    setView(tab);
  };

  const startShift = () => setShift((s) => ({ ...s, status: "working", checkIn: "09:02" }));
  const toggleShift = () =>
    setShift((s) => (s.status === "working" ? { ...s, status: "done", checkOut: "17:00" } : { ...s, status: "working" }));

  return (
    <div className="min-h-screen bg-ink-50/40 flex justify-center">
      <div className="w-full max-w-md min-h-screen bg-[#f7f9fc] relative pb-28">
        <HeaderBar
          user={currentUser}
          onBellClick={() => navigate("notifications")}
          title={SUB_SCREENS.has(view) ? TITLES[view] : undefined}
          onBack={SUB_SCREENS.has(view) ? goBack : undefined}
        />

        {view === "home" && <Home shift={shift} onStartShift={startShift} />}

        {view === "requests" && (
          <RequestsCatalog
            onSelectType={(category, item) => {
              setPendingType({ category, item });
              navigate("newRequest");
            }}
            onOpenMyRequests={() => navigate("myRequests")}
            onOpenManagerRequests={() => navigate("managerRequests")}
            isManager={isManager}
          />
        )}

        {view === "newRequest" && pendingType && (
          <NewRequestForm
            category={pendingType.category}
            item={pendingType.item}
            onCancel={goBack}
            onSubmit={() => {
              goBack();
              setView("myRequests");
            }}
          />
        )}

        {view === "myRequests" && <MyRequests onNewRequest={() => navigate("requests")} />}
        {view === "managerRequests" && <ManagerRequests />}

        {view === "statistics" && <Statistics onOpenNetworks={() => navigate("networks")} />}
        {view === "networks" && <Networks />}

        {view === "salary" && <Salary />}
        {view === "orgChart" && <OrgChart />}
        {view === "dailyReport" && <DailyReport />}
        {view === "announcements" && <Announcements />}
        {view === "vacationsHolidays" && <VacationsHolidays />}
        {view === "notifications" && <Notifications />}

        {view === "schedule" && <PlaceholderScreen title="My Schedule" icon="calendar" />}
        {view === "companyPolicy" && <PlaceholderScreen title="Company Policy" icon="policy" />}
        {view === "departmentPolicy" && <PlaceholderScreen title="Department Policy" icon="policy" />}

        {view === "more" && (
          <More user={currentUser} onNavigate={navigate} onLogout={() => setView("home")} />
        )}

        <BottomNav
          active={TAB_ROOT[view] ?? (SUB_SCREENS.has(view) ? undefined : view)}
          onChange={onTabChange}
          shiftActive={shift.status === "working"}
          onClockAction={toggleShift}
        />
      </div>
    </div>
  );
}
