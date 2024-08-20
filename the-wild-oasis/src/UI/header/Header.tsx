import "./Header.scss";
import { FaRegUser } from "react-icons/fa6";
import DarkmodeToggle from "../DarkmodeToggle";
import Logout from "../Logout";
import defualtUser from "../../data/default-user.jpg";
export default function Header() {
  interface USER {
    fullName: string;
  }
  const user: USER = localStorage.getItem("user");
  const userObject = JSON.parse(user);
  console.log(user);
  return (
    <header>
      <div className="user-info">
        <img className="Avatar" src={defualtUser} alt="avatar" />
        <span className="user-name">{userObject.fullName}</span>
      </div>
      <div className="icons-container">
        <button>
          <FaRegUser />
        </button>
        <DarkmodeToggle />
        <Logout />
      </div>
    </header>
  );
}
