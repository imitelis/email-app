import axiosInstance from "./api-client";

export const InviteEmail = async (email: string) => {
  return axiosInstance.post(`/invite`, { email }).then((res) => res.data);
};
