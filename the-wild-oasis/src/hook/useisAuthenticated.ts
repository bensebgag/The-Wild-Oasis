import { useQuery } from "@tanstack/react-query";
import { isAuthenticated as isAuthenticatedPermistion } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useIsAuthenticated() {
  const navigate = useNavigate();
  const { isPending: isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: isAuthenticatedPermistion,
  });
  const userfromLocalStorage = localStorage.getItem("user");
  if (!userfromLocalStorage) navigate("/login");
  return {
    isLoading,
    isAuthenticated: userfromLocalStorage?._id === user?._id,
  };
}
