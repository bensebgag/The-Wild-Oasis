import "./SideBar.scss";
import { TiHomeOutline } from "react-icons/ti";
import { IoCalendarOutline } from "react-icons/io5";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { FiUsers } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useDarkMode } from "../../Context/DarkModeContext";
import darkLogo from "../../data/logo-dark.png";
import lightLogo from "../../data/logo-light.png";

function SideBar() {
  const { isDarkMode } = useDarkMode();
  const pathImage = isDarkMode ? lightLogo : darkLogo;

  return (
    <div className="SideBar">
      <img className="logo" src={pathImage} alt="logo" />

      <ul className="navigation">
        <Link to="/dashboard">
          <li>
            <TiHomeOutline /> <span>Home</span>
          </li>
        </Link>
        <Link to={`/bookings`}>
          <li>
            <IoCalendarOutline /> <span>Bookings</span>
          </li>
        </Link>
        <Link to="cabin">
          <li>
            <HiOutlineHomeModern /> <span>Cabins</span>
          </li>
        </Link>
        <Link to="user">
          <li>
            <FiUsers /> <span>Users</span>
          </li>
        </Link>
        <Link to="setting">
          <li>
            <IoSettingsOutline /> <span>Settings</span>
          </li>
        </Link>
      </ul>
      <div className="SAMPLE-DATA">
        <span>SAMPLE DATA</span>
        <button>Upload ALL</button>
        <button>Upload bookings ONLY</button>
      </div>
    </div>
  );
}

export default SideBar;
