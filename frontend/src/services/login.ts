import { LoginCompose, SignUpCompose } from "../types/sessions";
import axiosInstance from "./api-client";

export const LoginUser = async (user: LoginCompose) => {
  return axiosInstance.post(`/login`, user).then((res) => res.data);
};

export const SignUpUser = async (user: SignUpCompose) => {
  return axiosInstance.post(`/signup`, user).then((res) => res.data);
};

/*
const config = {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
};
*/
