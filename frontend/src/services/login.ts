import axiosInstance from "./api-client";
import { LoginCompose } from "../types/sessions";

export const LoginUser = async (user: LoginCompose) => {
  return axiosInstance.post(`/login`, user).then((res) => res.data);
};
