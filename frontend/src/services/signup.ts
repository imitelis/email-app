import axiosInstance from "./api-client";
import { SignUpCompose } from "../types/sessions";

export const SignUpUser = async (user: SignUpCompose) => {
  return axiosInstance.post(`/signup`, user).then((res) => res.data);
};
