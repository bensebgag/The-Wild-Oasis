import { useMutation } from "@tanstack/react-query";
import { isAuthenticated as isAuthenticatedPermistion } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useIsAuthenticated() {
  const navigate = useNavigate();
  const { isPending: isLoading, data: user } = useMutation({
    mutationFn: isAuthenticatedPermistion,
  });
  const userfromLocalStorage = localStorage.getItem("user");
  if (!userfromLocalStorage) navigate("/login");
  return {
    isLoading,
    isAuthenticated: userfromLocalStorage?._id === user?._id,
  };
}
