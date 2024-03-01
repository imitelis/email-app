import { SendEmail } from "../types/emails";
import axiosInstance from "./api-client";
import axios from "axios";

export const getInboxEmails = async(token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  return axiosInstance.get(`/emails/inbox`, config).then((res) => res.data);
}

/*
export const getEmails = async () => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwOTI2MzY1NywianRpIjoiYzgxZjExNGYtMDNjMS00MzNlLWJhNmQtYmRhZDBmNzIxMjIwIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImRzYWF2ZWRyYUB1bmFsLmVkdS5jbyIsIm5iZiI6MTcwOTI2MzY1NywiY3NyZiI6ImJmODBlYzk0LWYzYmEtNDBkNS05NjQ0LTZhMzJhNzVjMjA3NSJ9.Qo5BhknQ_EWquJXre0aOImP2YVdQDCX8kydaw_S3RUo"
    },
  };
  return axios.get(`/emails/inbox`, config).then((res) => res.data);
};

headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },

*/

export const postNewEmail = async(token: string, email: SendEmail) => {
  const config = {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwOTI2NTMwNiwianRpIjoiNDI4ZjQxNTQtYzMxNS00NDA4LTgzMzctZTBhOTQ3Y2YwNjg3IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImRzYWF2ZWRyYUB1bmFsLmVkdS5jbyIsIm5iZiI6MTcwOTI2NTMwNiwiY3NyZiI6ImM5ZWU3Yjc1LTg3Y2MtNGNlYi05OGJhLTgxZjY2MjViYzhiZSJ9.SPGfUSdTH0IoOVvynRhC-hFuSFN4ZESduzv75JyzjZ8`,
      Accept: "application/json",
      "Content-Type": "application/json"      
    }
  }
  console.log(token)
  return axios.post(`/api/emails`, email, config).then((res) => res.data);
}
