import { EmailCompose } from "../types/emails";
import axiosInstance from "./api-client";

export const getEmails = async () => {
  return axiosInstance.get(`/emails/inbox`).then((res) => res.data);
};

export const sendEmail = async (email: EmailCompose) => {
  return axiosInstance.post(`/emails`, email).then((res) => res.data);
};

// import axios from "axios";

// const baseUrl = "/api/emails";

// const config = {
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   },
// };

// /*
// let token = null;
// token = null;

// export const setToken = (newToken: string) => {
//   token = `Bearer ${newToken}`;
// };
// */

// export const getEmails = async () => {
//   // add this config without removing previous one
//   //const config = {
//   //  headers: { authorization: token },
//   //};
//   return axios.get(`${baseUrl}/inbox`, config).then((res) => res.data);
// };
