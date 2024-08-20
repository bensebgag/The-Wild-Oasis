import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";

interface LoginParams {
  email: string;
  password: string;
}

export function useLogin() {
  const navigate = useNavigate();
  const {
    mutate: login,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ email, password }: LoginParams) =>
      loginApi({ email, password }),
    onSuccess: (data) => {
      navigate("/");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));
    },
  });
  return { login, isLoading: isPending, errorApi: error };
}
