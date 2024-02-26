import axios from "axios";

const baseUrl = "/api/emails";

const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
}

let token = null;

export const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};

export const getEmails = async () => {
  // add this config without removing previous one
  //const config = {
  //  headers: { authorization: token },
  //};
  return axios.get(`${baseUrl}/inbox`, config).then((res) => res.data);
};