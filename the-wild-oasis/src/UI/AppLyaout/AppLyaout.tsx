import "./AppLyaout.scss";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import SideBar from "../SideBar/SideBar";
export default function AppLyaout() {
  return (
    <div className="Lyout">
      <main>
        <Header />
        <Outlet />
      </main>
      <SideBar />
    </div>
  );
}
