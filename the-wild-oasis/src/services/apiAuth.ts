import axios from "axios";
import { api } from "./api";

interface LoginParams {
  email: string;
  password: string;
}
export const login = async ({ email, password }: LoginParams) => {
  try {
    const response = await api.post(`/users/login`, { email, password });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Login failed");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const logout = async () => {
  try {
    const response = await api.post("/users/logout");
    return response.data;
  } catch (err) {
    throw new Error("An unexpected error occurred");
  }
};

export const isAuthenticated = async () => {
  try {
    const response = await api.post("/users/isAuthenticated");
    console.log(response.data);
    return response.data;
  } catch (err) {
    throw new Error(err.message || "you need to login");
  }
};
