import axiosInstance from "./api-client";
import { SendEmail } from "../types/emails";

export const getInboxEmails = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosInstance.get(`/emails/inbox`, config).then((res) => res.data);
};

export const getSentEmails = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosInstance.get(`/emails/sent`, config).then((res) => res.data);
};

export const postNewEmail = async (token: string, email: SendEmail) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosInstance.post(`/emails/`, email, config).then((res) => res.data);
};

export const patchReadEmail = async (token: string, email_uuid: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosInstance
    .post(`/emails/inbox/open/${email_uuid}`, config)
    .then((res) => res.data);
};
