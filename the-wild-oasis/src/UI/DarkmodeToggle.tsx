import { GoSun } from "react-icons/go";
import { IoMoonOutline } from "react-icons/io5";
import { useDarkMode } from "../Context/DarkModeContext";
function DarkmodeToggle() {
  const { isDarkMode, toogleDarkMode } = useDarkMode();
  return (
    <button onClick={toogleDarkMode}>
      {isDarkMode ? <IoMoonOutline /> : <GoSun />}
    </button>
  );
}
export default DarkmodeToggle;
