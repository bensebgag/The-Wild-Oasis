import { TbLogout } from "react-icons/tb";
import { useLogout } from "../hook/useLogout";
import { ClipLoader } from "react-spinners";
function Logout() {
  const { isLoading, logout } = useLogout();

  const handleLogout = () => {
    logout();
  };
  return (
    <button disabled={isLoading} onClick={handleLogout}>
      {isLoading ? <ClipLoader /> : <TbLogout />}
    </button>
  );
}

export default Logout;
