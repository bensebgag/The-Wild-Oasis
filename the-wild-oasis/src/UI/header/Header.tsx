import "./Header.scss";
import { FaRegUser } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";
import DarkmodeToggle from "../DarkmodeToggle";

export default function Header() {
  return (
    <header>
      <div className="user-info">
        <img
          className="Avatar"
          src="https://qfvpyreitzgxuimnvjpy.supabase.co/storage/v1/object/public/avatars/avatar-7aecf179-1878-4fdf-9ac1-6db28302239a-0.6508537473594862"
          alt="avatar"
        />
        <span className="user-name">Alomin</span>
      </div>
      <div className="icons-container">
        <FaRegUser />
        <DarkmodeToggle />
        <TbLogout />
      </div>
    </header>
  );
}
