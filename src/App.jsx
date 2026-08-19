import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/AppLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import Offices from "./pages/Offices";
import Leaves from "./pages/Leaves";
import Permissions from "./pages/Permissions";
import Payroll from "./pages/Payroll";
import HrSettings from "./pages/HrSettings";
import MobileHrApp from "./pages/mobile/MobileHrApp";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Mobile app — this is what gets installed on phones (PWA).
              Self-contained shell with its own header/bottom nav. */}
          <Route
            path="/mobile-hr"
            element={
              <ProtectedRoute>
                <MobileHrApp />
              </ProtectedRoute>
            }
          />

          {/* Desktop admin back-office */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="employees" element={<Employees />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="offices" element={<Offices />} />
            <Route path="leaves" element={<Leaves />} />
            <Route path="permissions" element={<Permissions />} />
            <Route path="payroll" element={<Payroll />} />
            <Route path="hr-settings" element={<HrSettings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
