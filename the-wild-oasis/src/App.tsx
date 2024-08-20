import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "./features/dashboard/DashboardLayout";
import AppLyaout from "./UI/AppLyaout/AppLyaout";
import { DarkModeProvider } from "./Context/DarkModeContext";
import BookingsLayout from "./features/bookings/BookingsLayout";
import Cabin from "./features/cabins/Cabin";
import User from "./features/user/User";
import Setting from "./features/setting/Setting";
import Booking from "./features/bookings/Booking";
import Login from "./features/login/Login";
import ProtectRoute from "./UI/ProtectRoute";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
function App() {
  return (
    <>
      <DarkModeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectRoute>
                  <AppLyaout />
                </ProtectRoute>
              }
            >
              <Route index element={<DashboardLayout />} />
              <Route path="dashboard" element={<DashboardLayout />} />
              <Route path="bookings" element={<BookingsLayout />} />
              <Route path="bookings/:id" element={<Booking />} />
              <Route path="cabin" element={<Cabin />} />
              <Route path="user" element={<User />} />
              <Route path="setting" element={<Setting />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </DarkModeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;
