import axiosInstance from "./api-client";
import { PasswordCompose } from "../types/sessions";

export const patchUser = async (user: PasswordCompose) => {
    return axiosInstance.patch(`/users/`, user).then((res) => res.data);
};