import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { logout as logoutApi } from "../services/apiAuth";

export function useLogout() {
  const navigate = useNavigate();
  const queryiees = useQueryClient();
  const { mutate: logout, isPending: isLoading } = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      queryiees.removeQueries();
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      console.log(error);
      toast.error("Provided email or password is incorrect");
    },
  });
  return { logout, isLoading };
}
